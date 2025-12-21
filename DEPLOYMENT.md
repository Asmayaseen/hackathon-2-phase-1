# Deployment Guide - Evolution of Todo

> **Version:** Phase III - AI Chatbot Complete
> **Last Updated:** December 21, 2025

This guide covers deployment for Phase II & III features.

---

## 📋 Pre-Deployment Checklist

### ✅ Requirements Complete

**Phase II:**
- ✅ Next.js 15.5.7 frontend with App Router
- ✅ FastAPI backend with SQLModel ORM
- ✅ Neon PostgreSQL database configured
- ✅ RESTful API (6 endpoints)
- ✅ Cyberpunk neon UI theme
- ✅ Responsive design (mobile + desktop)
- ✅ Priority levels and due dates
- ⚠️ Better Auth integration (pending - using demo-user for testing)

**Phase III:**
- ✅ AI chat interface with cyberpunk theme
- ✅ OpenAI API with function calling
- ✅ MCP server with 5 tools
- ✅ Conversation & Message models
- ✅ SSE streaming support
- ✅ Chat endpoint /api/{user_id}/chat
- ⚠️ Better Auth integration (pending)

### 🔑 Environment Variables Needed

See full details in README.md

---

## 🚀 Quick Deployment

### Backend (Railway)
1. railway login
2. railway init (in backend/)
3. railway up
4. Set environment variables in dashboard
5. Copy deployment URL

### Frontend (Vercel)
1. vercel (in frontend/)
2. Set NEXT_PUBLIC_API_URL to Railway URL
3. vercel --prod
4. Update CORS in backend with Vercel URL

### Database (Neon)
Already configured! Tables ready.

---

## 🔍 Verify Deployment

**Backend Health:**
curl https://your-backend.railway.app/health

**Chat Health:**
curl https://your-backend.railway.app/api/demo-user/chat/health

**Frontend:**
Open https://your-app.vercel.app and test chat

---

For detailed deployment instructions, see documentation in Railway/Vercel/Neon docs.

**Status:** Ready for deployment!

