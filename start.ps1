# Digital Kisan Mitra - Quick Start
# This script starts a simple HTTP server and opens the app in your browser

$publicDir = Join-Path $PSScriptRoot "public"
Set-Location $publicDir

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Digital Kisan Mitra - Quick Start" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Open browser
Start-Process "http://localhost:8000"

# Try Python 3
$python = Get-Command python -ErrorAction SilentlyContinue
if ($python) {
    Write-Host "Starting with Python 3..." -ForegroundColor Yellow
    & python -m http.server 8000
    return
}

# Try py launcher
$py = Get-Command py -ErrorAction SilentlyContinue
if ($py) {
    Write-Host "Starting with Python launcher..." -ForegroundColor Yellow
    & py -3 -m http.server 8000
    return
}

# Try Node.js
$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
    Write-Host "Starting with Node.js..." -ForegroundColor Yellow
    & npx -y http-server -p 8000 -c-1
    return
}

Write-Host "ERROR: No web server found!" -ForegroundColor Red
Write-Host "Please install Python 3 or Node.js" -ForegroundColor Red
Read-Host "Press Enter to exit"