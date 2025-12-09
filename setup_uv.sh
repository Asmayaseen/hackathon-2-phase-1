#!/bin/bash

# Setup script for Evolution of Todo with UV Package Manager
# For Linux, macOS, and WSL

set -e  # Exit on error

echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║     Evolution of Todo - UV Setup Script                ║"
echo "║     Phase I - Console Application                       ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo "ℹ $1"
}

# Check if UV is installed
echo "═══════════════════════════════════════════════════════════"
echo "Step 1: Checking UV Installation"
echo "═══════════════════════════════════════════════════════════"
echo ""

if command -v uv &> /dev/null; then
    UV_VERSION=$(uv --version)
    print_success "UV is installed: $UV_VERSION"
else
    print_warning "UV is not installed"
    print_info "Installing UV..."

    # Install UV
    curl -LsSf https://astral.sh/uv/install.sh | sh

    # Add to PATH for current session
    export PATH="$HOME/.cargo/bin:$PATH"

    if command -v uv &> /dev/null; then
        print_success "UV installed successfully!"
    else
        print_error "UV installation failed. Please install manually:"
        echo "  curl -LsSf https://astral.sh/uv/install.sh | sh"
        exit 1
    fi
fi

echo ""

# Check Python version
echo "═══════════════════════════════════════════════════════════"
echo "Step 2: Checking Python Version"
echo "═══════════════════════════════════════════════════════════"
echo ""

if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    print_success "Python found: $PYTHON_VERSION"
else
    print_error "Python 3 not found. Please install Python 3.13+"
    exit 1
fi

echo ""

# Create virtual environment
echo "═══════════════════════════════════════════════════════════"
echo "Step 3: Creating Virtual Environment"
echo "═══════════════════════════════════════════════════════════"
echo ""

if [ -d ".venv" ]; then
    print_warning "Virtual environment already exists"
    read -p "Do you want to recreate it? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Removing existing virtual environment..."
        rm -rf .venv
        print_success "Removed old virtual environment"
    else
        print_info "Using existing virtual environment"
    fi
fi

if [ ! -d ".venv" ]; then
    print_info "Creating virtual environment with UV..."
    uv venv
    print_success "Virtual environment created at .venv/"
fi

echo ""

# Activate virtual environment
echo "═══════════════════════════════════════════════════════════"
echo "Step 4: Installing Dependencies"
echo "═══════════════════════════════════════════════════════════"
echo ""

print_info "Installing project dependencies..."

# Install the project in editable mode
uv pip install -e .

print_success "Project installed in development mode"

# Install dev dependencies
print_info "Installing development dependencies..."
uv pip install -e ".[dev]"

print_success "Development dependencies installed"

echo ""

# Verify installation
echo "═══════════════════════════════════════════════════════════"
echo "Step 5: Verifying Installation"
echo "═══════════════════════════════════════════════════════════"
echo ""

print_info "Checking installed packages..."
echo ""
uv pip list

echo ""

# Test Python files syntax
print_info "Checking Python syntax..."
python3 -m py_compile src/*.py && print_success "All Python files have valid syntax" || print_error "Syntax errors found"

echo ""

# Display success message
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║              ✓ SETUP COMPLETE! ✓                        ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "📦 Virtual Environment: .venv/"
echo "🐍 Python: $(python3 --version)"
echo "⚡ UV: $(uv --version)"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "  1. Activate the virtual environment:"
echo "     ${GREEN}source .venv/bin/activate${NC}"
echo ""
echo "  2. Run the application:"
echo "     ${GREEN}python src/main.py${NC}"
echo ""
echo "  Or run directly with UV (no activation needed):"
echo "     ${GREEN}uv run python src/main.py${NC}"
echo ""
echo "  3. Run linting:"
echo "     ${GREEN}uv run ruff check src/${NC}"
echo ""
echo "  4. Format code:"
echo "     ${GREEN}uv run ruff format src/${NC}"
echo ""
echo "📖 Documentation:"
echo "   • UV Setup Guide: UV_SETUP.md"
echo "   • Usage Guide: USAGE.md"
echo "   • Quick Start: QUICKSTART.md"
echo ""
echo "Happy Coding! 🎉"
