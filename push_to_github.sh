#!/bin/bash

# Quick script to push Evolution of Todo to GitHub
# Run this AFTER creating the repository on GitHub

echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║     Evolution of Todo - GitHub Push Script             ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get GitHub username
echo "Enter your GitHub username:"
read -r GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}✗${NC} GitHub username cannot be empty"
    exit 1
fi

# Repository name
REPO_NAME="evolution-of-todo-phase-1"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Repository Details"
echo "═══════════════════════════════════════════════════════════"
echo -e "Username: ${GREEN}$GITHUB_USERNAME${NC}"
echo -e "Repository: ${GREEN}$REPO_NAME${NC}"
echo -e "URL: ${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo ""

# Confirm
echo "Have you created this repository on GitHub? (y/N)"
read -r CONFIRM

if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${YELLOW}⚠${NC} Please create the repository first:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Repository name: $REPO_NAME"
    echo "   3. Description: Spec-driven Python console Todo application - Phase I"
    echo "   4. DO NOT initialize with README (we already have it)"
    echo "   5. Click 'Create repository'"
    echo ""
    echo "Then run this script again!"
    exit 0
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Adding GitHub Remote"
echo "═══════════════════════════════════════════════════════════"

# Check if remote already exists
if git remote | grep -q "^origin$"; then
    echo -e "${YELLOW}⚠${NC} Remote 'origin' already exists. Removing it..."
    git remote remove origin
fi

# Add remote
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
git remote add origin "$REPO_URL"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Remote added successfully"
else
    echo -e "${RED}✗${NC} Failed to add remote"
    exit 1
fi

# Verify remote
echo ""
echo "Remote repositories:"
git remote -v

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Pushing to GitHub"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Pushing master branch to GitHub..."
echo ""

# Push to GitHub
git push -u origin master

if [ $? -eq 0 ]; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║                                                          ║"
    echo "║              ✓ PUSH SUCCESSFUL! ✓                       ║"
    echo "║                                                          ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "🎉 Your project is now on GitHub!"
    echo ""
    echo "📱 View your repository:"
    echo "   ${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
    echo ""
    echo "📋 Next Steps:"
    echo "   1. Add repository description and topics"
    echo "   2. Create a release (v0.1.0)"
    echo "   3. Share your project!"
    echo ""
    echo "See GITHUB_SETUP.md for detailed instructions."
else
    echo ""
    echo -e "${RED}✗${NC} Push failed!"
    echo ""
    echo "Possible issues:"
    echo "   - Repository doesn't exist on GitHub"
    echo "   - You don't have push permissions"
    echo "   - Wrong username or repository name"
    echo "   - Authentication required (use SSH or personal access token)"
    echo ""
    echo "Check GITHUB_SETUP.md for troubleshooting."
    exit 1
fi
