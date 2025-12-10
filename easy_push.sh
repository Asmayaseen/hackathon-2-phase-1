#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║     Easy GitHub Push with Token                         ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

echo "Paste your GitHub Personal Access Token (ghp_...):"
read -s TOKEN

if [ -z "$TOKEN" ]; then
    echo "❌ Token empty!"
    exit 1
fi

echo ""
echo "Pushing to GitHub..."
echo ""

# Use token for authentication
git push https://Asmayaseen:${TOKEN}@github.com/Asmayaseen/hackathon-2-phase-1.git master

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ PUSH SUCCESSFUL!"
    echo ""
    echo "🎉 View your repository:"
    echo "https://github.com/Asmayaseen/hackathon-2-phase-1"
else
    echo ""
    echo "❌ Push failed! Check your token."
fi
