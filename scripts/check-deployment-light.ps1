param (
    [Parameter(Mandatory = $true)]
    [string]$BaseUrl,

    [Parameter(Mandatory = $true)]
    [string]$HealthToken
)

$BaseUrl = $BaseUrl.TrimEnd("/")

$Headers = @{
    "User-Agent" = "Mozilla/5.0"
    "x-health-token" = $HealthToken
}

Write-Host "Checking light deployment at $BaseUrl..." -ForegroundColor Cyan

try {
    $health = Invoke-RestMethod `
        -Uri "$BaseUrl/api/health" `
        -Headers $Headers `
        -Method Get

    $health | ConvertTo-Json
    Write-Host "OK /api/health" -ForegroundColor Green
}
catch {
    Write-Host "FAILED /api/health" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

try {
    $homesite = Invoke-WebRequest `
        -Uri "$BaseUrl/" `
        -UseBasicParsing `
        -Headers @{ "User-Agent" = "Mozilla/5.0" } `
        -Method Get

    Write-Host "OK / $($homesite.StatusCode)" -ForegroundColor Green
}
catch {
    Write-Host "FAILED /" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

Write-Host "Light deployment check complete." -ForegroundColor Cyan