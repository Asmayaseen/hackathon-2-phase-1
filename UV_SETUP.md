# UV Package Manager Setup Guide

> **Modern Python Package Management with UV**
> **Project:** Evolution of Todo - Phase I

---

## 🚀 What is UV?

UV is a blazingly fast Python package installer and resolver, written in Rust. It's designed to be a drop-in replacement for pip and pip-tools, offering:

- ⚡ **10-100x faster** than pip
- 🔒 **Deterministic** dependency resolution
- 🎯 **Drop-in replacement** for pip
- 📦 **Better dependency management**
- 🛠️ **Built-in virtual environment** support

---

## 📥 Installation

### Linux / macOS / WSL

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Windows (PowerShell)

```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Verify Installation

```bash
uv --version
```

Expected output: `uv 0.x.x` or higher

---

## 🎯 Quick Start with This Project

### Option 1: Automatic Setup (Recommended)

```bash
# Navigate to project directory
cd hackathon-2-phase-1

# Run setup script (creates venv and installs deps)
./setup_uv.sh

# Or on Windows
.\setup_uv.bat
```

### Option 2: Manual Setup

```bash
# 1. Navigate to project
cd hackathon-2-phase-1

# 2. Create virtual environment with UV
uv venv

# 3. Activate virtual environment
# On Linux/macOS/WSL:
source .venv/bin/activate

# On Windows:
.venv\Scripts\activate

# 4. Install project in development mode
uv pip install -e .

# 5. Install dev dependencies
uv pip install -e ".[dev]"
```

---

## 🏃 Running the Application

### With UV (No activation needed)

```bash
# Run directly with UV
uv run python src/main.py

# Or with the package entry point
uv run todo
```

### With Activated Environment

```bash
# Activate environment first
source .venv/bin/activate  # Linux/macOS/WSL
# or
.venv\Scripts\activate     # Windows

# Then run normally
python src/main.py
```

---

## 📦 Package Management with UV

### Installing Packages

```bash
# Install a package
uv pip install package-name

# Install from requirements
uv pip install -r requirements.txt

# Install project dependencies
uv pip install -e .

# Install with dev dependencies
uv pip install -e ".[dev]"
```

### Listing Packages

```bash
# List installed packages
uv pip list

# Show package details
uv pip show package-name

# Check outdated packages
uv pip list --outdated
```

### Updating Packages

```bash
# Update a specific package
uv pip install --upgrade package-name

# Update all packages
uv pip install --upgrade --upgrade-strategy eager -r requirements.txt
```

### Removing Packages

```bash
# Uninstall a package
uv pip uninstall package-name
```

---

## 🔧 UV Commands Reference

### Virtual Environment

```bash
# Create venv
uv venv

# Create venv with specific Python version
uv venv --python 3.13

# Create venv in specific location
uv venv /path/to/venv
```

### Pip Operations

```bash
# Install packages
uv pip install package-name

# Install from requirements
uv pip install -r requirements.txt

# Sync dependencies (install and remove to match requirements)
uv pip sync requirements.txt

# Compile requirements with hashes
uv pip compile requirements.in -o requirements.txt

# List packages
uv pip list

# Show package info
uv pip show package-name

# Freeze installed packages
uv pip freeze

# Check dependencies
uv pip check
```

### Running Commands

```bash
# Run Python with UV
uv run python script.py

# Run with specific Python version
uv run --python 3.13 python script.py

# Run in isolated environment
uv run --isolated python script.py
```

---

## 📋 Project Structure with UV

```
hackathon-2-phase-1/
├── .venv/                  # Virtual environment (created by UV)
├── src/                    # Source code
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── todo_manager.py
│   └── ui.py
├── pyproject.toml          # Project configuration
├── requirements.txt        # Optional: pinned dependencies
├── requirements-dev.txt    # Optional: dev dependencies
├── setup_uv.sh            # Setup script for Linux/macOS
├── setup_uv.bat           # Setup script for Windows
└── UV_SETUP.md            # This file
```

---

## 🎯 Development Workflow with UV

### 1. Initial Setup

```bash
# Clone/navigate to project
cd hackathon-2-phase-1

# Setup with UV
uv venv
uv pip install -e ".[dev]"
```

### 2. Daily Development

```bash
# Run application
uv run python src/main.py

# Run with hot reload (if using watchdog)
uv run python src/main.py --reload

# Run tests (when added)
uv run pytest

# Format code
uv run ruff format src/

# Lint code
uv run ruff check src/
```

### 3. Adding Dependencies

```bash
# Add to pyproject.toml dependencies section
# Then install
uv pip install -e .

# Or install directly
uv pip install package-name
# Then add to pyproject.toml manually
```

### 4. Updating Dependencies

```bash
# Update all packages
uv pip install --upgrade -e ".[dev]"

# Or update specific package
uv pip install --upgrade package-name
```

---

## 🔒 Dependency Locking

UV supports deterministic dependency resolution:

### Create Lock File

```bash
# Generate requirements.txt with exact versions
uv pip freeze > requirements.txt

# Or compile from pyproject.toml
uv pip compile pyproject.toml -o requirements.txt
```

### Use Lock File

```bash
# Install exact versions
uv pip sync requirements.txt
```

---

## 💡 UV Best Practices

### 1. Use Virtual Environments

Always work in a virtual environment:
```bash
uv venv
source .venv/bin/activate
```

### 2. Pin Dependencies

For production, use `requirements.txt` with exact versions:
```bash
uv pip freeze > requirements.txt
```

### 3. Separate Dev Dependencies

Keep dev dependencies separate in `pyproject.toml`:
```toml
[project.optional-dependencies]
dev = [
    "ruff>=0.8.0",
    "pytest>=7.0.0",
]
```

### 4. Use UV Run

Run commands directly without activation:
```bash
uv run python src/main.py
```

### 5. Regular Updates

Keep UV itself updated:
```bash
# Update UV
curl -LsSf https://astral.sh/uv/install.sh | sh
```

---

## 🐛 Troubleshooting

### UV Command Not Found

**Problem:** `uv: command not found`

**Solution:**
```bash
# Add UV to PATH
export PATH="$HOME/.cargo/bin:$PATH"

# Or reinstall UV
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Python Version Issues

**Problem:** Wrong Python version

**Solution:**
```bash
# Specify Python version
uv venv --python 3.13

# Or use specific Python
uv venv --python /usr/bin/python3.13
```

### Package Installation Fails

**Problem:** Package won't install

**Solution:**
```bash
# Try with verbose output
uv pip install -v package-name

# Or upgrade UV
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Virtual Environment Issues

**Problem:** Can't activate venv

**Solution:**
```bash
# Delete and recreate
rm -rf .venv
uv venv
source .venv/bin/activate
```

---

## 📊 UV vs Pip Comparison

| Feature | UV | Pip |
|---------|----|----|
| Speed | ⚡ 10-100x faster | Standard |
| Dependency Resolution | ✅ Deterministic | ⚠️ Can vary |
| Parallel Downloads | ✅ Yes | ❌ No |
| Built-in Venv | ✅ Yes | ❌ Separate tool |
| Compatibility | ✅ Drop-in replacement | Standard |
| Written in | 🦀 Rust | Python |

---

## 🎓 Additional Resources

### Official Documentation
- **UV Docs:** https://docs.astral.sh/uv/
- **GitHub:** https://github.com/astral-sh/uv

### Tutorials
- Getting Started with UV
- UV for Python Developers
- Migrating from pip to UV

---

## ✅ Verification Checklist

After setup, verify everything works:

```bash
# Check UV version
uv --version

# Check Python in venv
uv run python --version

# List installed packages
uv pip list

# Run the application
uv run python src/main.py

# Run linting
uv run ruff check src/
```

All commands should work without errors!

---

## 🚀 Next Steps

1. ✅ Install UV
2. ✅ Run setup script (`./setup_uv.sh`)
3. ✅ Test application (`uv run python src/main.py`)
4. ✅ Start developing!

---

**Happy Coding with UV! ⚡**

*UV makes Python package management fast and reliable!*
