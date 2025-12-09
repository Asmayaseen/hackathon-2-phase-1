@echo off
REM Quick script to push Evolution of Todo to GitHub
REM Run this AFTER creating the repository on GitHub

echo ================================================================
echo.
echo     Evolution of Todo - GitHub Push Script
echo.
echo ================================================================
echo.

REM Get GitHub username
set /p GITHUB_USERNAME="Enter your GitHub username: "

if "%GITHUB_USERNAME%"=="" (
    echo [31m✗[0m GitHub username cannot be empty
    pause
    exit /b 1
)

REM Repository name
set REPO_NAME=evolution-of-todo-phase-1

echo.
echo ═══════════════════════════════════════════════════════════
echo Repository Details
echo ═══════════════════════════════════════════════════════════
echo Username: [32m%GITHUB_USERNAME%[0m
echo Repository: [32m%REPO_NAME%[0m
echo URL: [32mhttps://github.com/%GITHUB_USERNAME%/%REPO_NAME%[0m
echo.

REM Confirm
set /p CONFIRM="Have you created this repository on GitHub? (y/N): "

if /i not "%CONFIRM%"=="y" (
    echo.
    echo [33m⚠[0m Please create the repository first:
    echo    1. Go to https://github.com/new
    echo    2. Repository name: %REPO_NAME%
    echo    3. Description: Spec-driven Python console Todo application - Phase I
    echo    4. DO NOT initialize with README (we already have it^)
    echo    5. Click 'Create repository'
    echo.
    echo Then run this script again!
    pause
    exit /b 0
)

echo.
echo ═══════════════════════════════════════════════════════════
echo Adding GitHub Remote
echo ═══════════════════════════════════════════════════════════

REM Check if remote already exists
git remote | findstr /C:"origin" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [33m⚠[0m Remote 'origin' already exists. Removing it...
    git remote remove origin
)

REM Add remote
set REPO_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
git remote add origin %REPO_URL%

if %ERRORLEVEL% EQU 0 (
    echo [32m✓[0m Remote added successfully
) else (
    echo [31m✗[0m Failed to add remote
    pause
    exit /b 1
)

REM Verify remote
echo.
echo Remote repositories:
git remote -v

echo.
echo ═══════════════════════════════════════════════════════════
echo Pushing to GitHub
echo ═══════════════════════════════════════════════════════════
echo.
echo Pushing master branch to GitHub...
echo.

REM Push to GitHub
git push -u origin master

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo.
    echo              ✓ PUSH SUCCESSFUL! ✓
    echo.
    echo ================================================================
    echo.
    echo 🎉 Your project is now on GitHub!
    echo.
    echo 📱 View your repository:
    echo    [32mhttps://github.com/%GITHUB_USERNAME%/%REPO_NAME%[0m
    echo.
    echo 📋 Next Steps:
    echo    1. Add repository description and topics
    echo    2. Create a release (v0.1.0^)
    echo    3. Share your project!
    echo.
    echo See GITHUB_SETUP.md for detailed instructions.
) else (
    echo.
    echo [31m✗[0m Push failed!
    echo.
    echo Possible issues:
    echo    - Repository doesn't exist on GitHub
    echo    - You don't have push permissions
    echo    - Wrong username or repository name
    echo    - Authentication required (use SSH or personal access token^)
    echo.
    echo Check GITHUB_SETUP.md for troubleshooting.
    pause
    exit /b 1
)

echo.
pause
