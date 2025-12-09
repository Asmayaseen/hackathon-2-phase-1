# UV Quick Reference Card

> **Handy commands for UV package manager**

---

## 🚀 Installation

```bash
# Linux/macOS/WSL
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Verify
uv --version
```

---

## 📦 Project Setup

```bash
# Run setup script (recommended)
./setup_uv.sh           # Linux/macOS/WSL
setup_uv.bat            # Windows

# Or manual setup
uv venv                 # Create virtual environment
uv pip install -e .     # Install project
uv pip install -e ".[dev]"  # Install with dev deps
```

---

## 🏃 Running Commands

```bash
# Run Python with UV (no activation needed)
uv run python src/main.py

# Run any command
uv run <command>

# Run with specific Python version
uv run --python 3.13 python script.py
```

---

## 📥 Package Management

### Installing
```bash
uv pip install <package>        # Install package
uv pip install -r requirements.txt  # From requirements
uv pip install -e .             # Install project
uv pip install -e ".[dev]"      # With optional deps
```

### Listing
```bash
uv pip list                     # List all packages
uv pip list --outdated          # Show outdated packages
uv pip show <package>           # Package details
uv pip freeze                   # Export installed packages
```

### Updating
```bash
uv pip install --upgrade <package>  # Update package
uv pip install --upgrade -e ".[dev]"  # Update all
```

### Removing
```bash
uv pip uninstall <package>      # Remove package
```

---

## 🔧 Virtual Environment

```bash
uv venv                         # Create .venv
uv venv <path>                  # Create at path
uv venv --python 3.13           # Specific Python version

# Activate (optional with UV)
source .venv/bin/activate       # Linux/macOS/WSL
.venv\Scripts\activate          # Windows
```

---

## 🎯 Common Tasks for This Project

```bash
# Setup
./setup_uv.sh                   # Complete setup

# Run application
uv run python src/main.py       # Start todo app

# Code quality
uv run ruff check src/          # Lint code
uv run ruff format src/         # Format code

# Development
uv pip install <package>        # Add dependency
uv pip list                     # Check installed
```

---

## 💡 Tips

1. **No activation needed**: Use `uv run` to run commands directly
2. **Fast**: UV is 10-100x faster than pip
3. **Deterministic**: Same dependencies every time
4. **Compatible**: Drop-in replacement for pip

---

## 📚 Full Documentation

- **Complete Guide:** `UV_SETUP.md`
- **Project Setup:** `README.md`
- **Usage Examples:** `USAGE.md`

---

**Quick Help:** `uv --help` or `uv pip --help`
