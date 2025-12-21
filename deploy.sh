#!/bin/bash
# Deployment script for Evolution of Todo
# Phase II & III - Production Deployment

set -e

echo "======================================"
echo "Evolution of Todo - Deployment Script"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Frontend Deployment to Vercel
echo -e "${YELLOW}Step 1: Deploying Frontend to Vercel${NC}"
echo "--------------------------------------"
cd frontend

echo "Checking Vercel authentication..."
if ! vercel whoami > /dev/null 2>&1; then
    echo -e "${YELLOW}Please login to Vercel first:${NC}"
    echo "Running: vercel login"
    vercel login
fi

echo -e "${GREEN}✓${NC} Vercel authentication successful"
echo ""

echo "Deploying frontend to Vercel..."
echo "NOTE: When prompted:"
echo "  - Link to existing project? Choose 'N' for first deployment"
echo "  - Project name: evolution-todo (or your choice)"
echo "  - Framework: Next.js (should auto-detect)"
echo ""

# Deploy to production
vercel --prod

echo -e "${GREEN}✓${NC} Frontend deployed successfully!"
FRONTEND_URL=$(vercel ls 2>/dev/null | grep "evolution-todo" | head -1 | awk '{print $2}')
echo -e "Frontend URL: ${GREEN}https://$FRONTEND_URL${NC}"
echo ""

cd ..

# Step 2: Backend Deployment Instructions
echo -e "${YELLOW}Step 2: Backend Deployment${NC}"
echo "--------------------------------------"
echo ""
echo "Backend deployment options:"
echo ""
echo "Option A: Railway (Recommended)"
echo "  1. Install Railway CLI: npm install -g @railway/cli"
echo "  2. Login: railway login"
echo "  3. Deploy: cd backend && railway up"
echo "  4. Set environment variables in Railway dashboard"
echo ""
echo "Option B: Render"
echo "  1. Go to: https://render.com"
echo "  2. New Web Service → Connect GitHub"
echo "  3. Select repository: hackathon-2-phase-1"
echo "  4. Root directory: backend"
echo "  5. Build: pip install -r requirements.txt"
echo "  6. Start: uvicorn main:app --host 0.0.0.0 --port \$PORT"
echo ""
echo "Option C: Manual Railway Setup"
echo "  Run: ./deploy-backend-railway.sh"
echo ""

# Step 3: Environment Variables
echo -e "${YELLOW}Step 3: Update Environment Variables${NC}"
echo "--------------------------------------"
echo ""
echo "After backend deployment, update these:"
echo ""
echo "Frontend (Vercel Dashboard):"
echo "  NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app"
echo "  DATABASE_URL=<your-neon-database-url>"
echo "  BETTER_AUTH_SECRET=<your-secret>"
echo "  BETTER_AUTH_URL=https://$FRONTEND_URL"
echo ""
echo "Backend (Railway/Render Dashboard):"
echo "  DATABASE_URL=<your-neon-database-url>"
echo "  OPENAI_API_KEY=<your-openai-key>"
echo "  ALLOWED_ORIGINS=https://$FRONTEND_URL"
echo "  BETTER_AUTH_SECRET=<same-as-frontend>"
echo ""

echo -e "${GREEN}======================================"
echo "Deployment Summary"
echo "======================================${NC}"
echo ""
echo -e "Frontend: ${GREEN}Deployed to Vercel ✓${NC}"
echo -e "URL: https://$FRONTEND_URL"
echo ""
echo -e "Backend: ${YELLOW}Manual deployment required${NC}"
echo "Follow instructions above"
echo ""
echo -e "${GREEN}Next Steps:${NC}"
echo "1. Deploy backend using one of the options above"
echo "2. Update environment variables in both platforms"
echo "3. Test your application!"
echo ""
echo "Documentation: See DEPLOYMENT.md for details"
echo ""
