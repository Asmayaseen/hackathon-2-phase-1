@echo off
REM Setup script for Evolution of Todo with UV Package Manager
REM For Windows

echo ================================================================
echo.
echo     Evolution of Todo - UV Setup Script
echo     Phase I - Console Application
echo.
echo ================================================================
echo.

REM Check if UV is installed
echo ================================================================
echo Step 1: Checking UV Installation
echo ================================================================
echo.

where uv >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [32m✓[0m UV is installed
    uv --version
) else (
    echo [33m⚠[0m UV is not installed
    echo Installing UV...
    echo.
    powershell -Command "irm https://astral.sh/uv/install.ps1 | iex"

    where uv >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [32m✓[0m UV installed successfully!
    ) else (
        echo [31m✗[0m UV installation failed
        echo Please install manually:
        echo   powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
        pause
        exit /b 1
    )
)

echo.

REM Check Python
echo ================================================================
echo Step 2: Checking Python Version
echo ================================================================
echo.

python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [32m✓[0m Python found:
    python --version
) else (
    echo [31m✗[0m Python not found
    echo Please install Python 3.13+
    pause
    exit /b 1
)

echo.

REM Create virtual environment
echo ================================================================
echo Step 3: Creating Virtual Environment
echo ================================================================
echo.

if exist ".venv" (
    echo [33m⚠[0m Virtual environment already exists
    set /p RECREATE="Do you want to recreate it? (y/N): "
    if /i "%RECREATE%"=="y" (
        echo Removing existing virtual environment...
        rmdir /s /q .venv
        echo [32m✓[0m Removed old virtual environment
    ) else (
        echo Using existing virtual environment
    )
)

if not exist ".venv" (
    echo Creating virtual environment with UV...
    uv venv
    echo [32m✓[0m Virtual environment created at .venv\
)

echo.

REM Install dependencies
echo ================================================================
echo Step 4: Installing Dependencies
echo ================================================================
echo.

echo Installing project dependencies...
uv pip install -e .
echo [32m✓[0m Project installed in development mode

echo.
echo Installing development dependencies...
uv pip install -e ".[dev]"
echo [32m✓[0m Development dependencies installed

echo.

REM Verify installation
echo ================================================================
echo Step 5: Verifying Installation
echo ================================================================
echo.

echo Checking installed packages...
echo.
uv pip list

echo.

REM Display success message
echo ================================================================
echo.
echo              ✓ SETUP COMPLETE! ✓
echo.
echo ================================================================
echo.
echo 📦 Virtual Environment: .venv\
python --version
uv --version
echo.
echo 🚀 Next Steps:
echo.
echo   1. Activate the virtual environment:
echo      [32m.venv\Scripts\activate[0m
echo.
echo   2. Run the application:
echo      [32mpython src\main.py[0m
echo.
echo   Or run directly with UV (no activation needed):
echo      [32muv run python src\main.py[0m
echo.
echo   3. Run linting:
echo      [32muv run ruff check src/[0m
echo.
echo   4. Format code:
echo      [32muv run ruff format src/[0m
echo.
echo 📖 Documentation:
echo    • UV Setup Guide: UV_SETUP.md
echo    • Usage Guide: USAGE.md
echo    • Quick Start: QUICKSTART.md
echo.
echo Happy Coding! 🎉
echo.
pause
