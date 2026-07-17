param (
    [Parameter(Mandatory = $true)]
    [string]$BaseUrl,

    [Parameter(Mandatory = $true)]
    [string]$HealthToken
)

$BaseUrl = $BaseUrl.TrimEnd("/")

$BrowserHeaders = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
}

$ProtectedHeaders = @{
    "User-Agent" = $BrowserHeaders["User-Agent"]
    "Accept" = "application/json,text/plain,*/*"
    "x-health-token" = $HealthToken
}

function Test-JsonEndpoint {
    param (
        [string]$Label,
        [string]$Url
    )

    Write-Host "`nChecking $Label..." -ForegroundColor Yellow

    try {
        $response = Invoke-RestMethod `
            -Uri $Url `
            -Headers $ProtectedHeaders `
            -Method Get

        $response | ConvertTo-Json
        Write-Host "OK $Label" -ForegroundColor Green
    }
    catch {
        Write-Host "FAILED $Label" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}

function Test-PublicUrl {
    param (
        [string]$Path
    )

    $url = "$BaseUrl$Path"

    try {
        $response = Invoke-WebRequest `
            -Uri $url `
            -UseBasicParsing `
            -Headers $BrowserHeaders `
            -Method Get

        Write-Host "OK $Path $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        Write-Host "FAILED $Path" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}

Write-Host "Checking deployment at $BaseUrl..." -ForegroundColor Cyan

Test-JsonEndpoint -Label "/api/health" -Url "$BaseUrl/api/health"
Test-JsonEndpoint -Label "/api/version" -Url "$BaseUrl/api/version"

Write-Host "`nChecking public pages..." -ForegroundColor Yellow

$pages = @(
    "/",
    "/services",
    "/projects",
    "/packages",
    "/process",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/accessibility"
)

foreach ($page in $pages) {
    Test-PublicUrl -Path $page
}

Write-Host "`nChecking public assets..." -ForegroundColor Yellow

$assets = @(
    "/favicon.ico",
    "/logo/SpearLogoRemakeV4.png",
    "/robots.txt",
    "/sitemap.xml",
    "/opengraph-image"
)

foreach ($asset in $assets) {
    Test-PublicUrl -Path $asset
}

Write-Host "`nDeployment check complete." -ForegroundColor Cyan