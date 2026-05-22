param (
    [Parameter(Mandatory = $true)]
    [string]$BaseUrl,

    [Parameter(Mandatory = $true)]
    [string]$HealthToken
)

Write-Host "Checking deployment at $BaseUrl..." -ForegroundColor Cyan

Write-Host "`nChecking /api/health..." -ForegroundColor Yellow
$health = Invoke-RestMethod `
  -Uri "$BaseUrl/api/health" `
  -Headers @{ "x-health-token" = $HealthToken }

$health | ConvertTo-Json

Write-Host "`nChecking /api/version..." -ForegroundColor Yellow
$version = Invoke-RestMethod `
  -Uri "$BaseUrl/api/version" `
  -Headers @{ "x-health-token" = $HealthToken }

$version | ConvertTo-Json

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
    $url = "$BaseUrl$page"

    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        Write-Host "OK $page $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        Write-Host "FAILED $page" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
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
    $url = "$BaseUrl$asset"

    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        Write-Host "OK $asset $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        Write-Host "FAILED $asset" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}

Write-Host "`nDeployment check complete." -ForegroundColor Cyan