@echo off
title Digital Kisan Mitra
echo ========================================
echo   Digital Kisan Mitra - Quick Start
echo ========================================
echo.

cd /d "%~dp0"

REM Try Node.js first (no dependencies needed!)
where node >nul 2>&1
if %errorlevel% == 0 (
    echo Starting with Node.js (no dependencies required)...
    start "" "http://localhost:8000"
    node server-frontend.js
    goto end
)

REM Try Python 3
where python >nul 2>&1
if %errorlevel% == 0 (
    echo Starting with Python 3...
    start "" "http://localhost:8000"
    cd public
    python -m http.server 8000
    goto end
)

REM Try Python launcher
where py >nul 2>&1
if %errorlevel% == 0 (
    echo Starting with Python...
    start "" "http://localhost:8000"
    cd public
    py -3 -m http.server 8000
    goto end
)

echo.
echo ========================================
echo   ERROR: No runtime found!
echo ========================================
echo.
echo Please install ONE of these:
echo   1. Node.js (recommended) - https://nodejs.org
echo   2. Python 3 - https://python.org
echo.
echo After installation, restart this script.
echo.
pause

:end