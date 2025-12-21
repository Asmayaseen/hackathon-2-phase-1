# Quick Deployment Guide

## 🚀 Deploy in 3 Steps

### Step 1: Frontend (Vercel) - 2 minutes

```bash
cd frontend
vercel login
vercel --prod
```

When prompted:
- Link to existing project? → **N** (first time) or **Y** (updating)
- Project name → **evolution-todo** (or your choice)
- Framework → **Next.js** (auto-detected)

**Result:** Frontend deployed at `https://your-project.vercel.app`

---

### Step 2: Backend (Railway) - 3 minutes

**Install Railway CLI:**
```bash
npm install -g @railway/cli
```

**Deploy:**
```bash
railway login
cd backend
railway init
railway up
```

**Set Environment Variables in Railway Dashboard:**
```env
DATABASE_URL=<your-neon-url>
OPENAI_API_KEY=<your-openai-key>
ALLOWED_ORIGINS=https://your-project.vercel.app
BETTER_AUTH_SECRET=<generate-random-32-char-string>
```

**Result:** Backend deployed at `https://your-app.railway.app`

---

### Step 3: Update Frontend Environment

**In Vercel Dashboard → Settings → Environment Variables:**

```env
NEXT_PUBLIC_API_URL=https://your-app.railway.app
DATABASE_URL=<your-neon-url>
BETTER_AUTH_SECRET=<same-as-backend>
BETTER_AUTH_URL=https://your-project.vercel.app
```

**Redeploy Frontend:**
```bash
vercel --prod
```

---

## ✅ Deployment Complete!

### Test Your App:

1. **Frontend:** https://your-project.vercel.app
2. **Backend API:** https://your-app.railway.app/health
3. **Chat:** https://your-project.vercel.app/chat

### Verify Everything Works:

```bash
# Test backend health
curl https://your-app.railway.app/health

# Test chat health
curl https://your-app.railway.app/api/demo-user/chat/health
```

---

## 🔧 Alternative: Render (Instead of Railway)

**If Railway doesn't work, use Render:**

1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - Name: evolution-todo-backend
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables (same as Railway)
6. Deploy!

---

## 📝 Current Environment Variables

**Your Neon Database URL:**
Check backend/.env file for DATABASE_URL

**Your OpenAI API Key:**
Check backend/.env file for OPENAI_API_KEY

**Generate BETTER_AUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## 🐛 Troubleshooting

### Frontend Issues:
- **Build fails:** Check NEXT_PUBLIC_API_URL is set
- **API not connecting:** Verify backend URL is correct
- **CORS errors:** Check ALLOWED_ORIGINS in backend

### Backend Issues:
- **500 errors:** Check DATABASE_URL and OPENAI_API_KEY
- **Import errors:** Railway should auto-install from requirements.txt
- **Connection refused:** Check PORT environment variable

---

## 📊 Deployment Status

After successful deployment, you should have:

- ✅ Frontend on Vercel
- ✅ Backend on Railway/Render  
- ✅ Database on Neon (already configured)
- ✅ All features working in production

**Total Time:** ~10 minutes

---

**Need Help?** Check DEPLOYMENT.md for detailed instructions.
