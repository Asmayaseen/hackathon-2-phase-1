# Deployment Guide - Phase II

## 📊 Current Status

### ✅ Completed
- All code implemented and tested
- TypeScript type checking passed
- Git commit created with changes
- Ready for deployment

### 📝 Latest Commit
```
commit 1cf3c85
Fix TypeScript errors and add setup documentation
- Better Auth configuration fixed
- TypeScript types added
- SETUP.md guide created
```

---

## 🚀 Step 1: Push to GitHub

Since git push requires authentication, please run this command manually:

```bash
cd "/mnt/c/Users/S com/OneDrive/Desktop/hackathon-2-phase-1"

# Push to GitHub (you'll be prompted for credentials)
git push origin master

# Or if you have SSH key configured:
git remote set-url origin git@github.com:Asmayaseen/hackathon-2-phase-1.git
git push origin master
```

**Repository:** https://github.com/Asmayaseen/hackathon-2-phase-1

---

## ☁️ Step 2: Deploy Frontend to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `Asmayaseen/hackathon-2-phase-1`
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   BETTER_AUTH_SECRET=5Uk7VYMMiWOxhfeU1LCCWey2qQcpp1PX4sxFMQzKhGk=
   BETTER_AUTH_URL=https://your-app.vercel.app
   DATABASE_URL=postgresql://neondb_owner:npg_9o7LbiyKpwrN@ep-divine-union-ahlsszpq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```

6. Click "Deploy"

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to frontend
cd frontend

# Deploy
vercel --prod

# Follow prompts and add environment variables
```

---

## 🖥️ Step 3: Deploy Backend to Railway

### Why Railway?
- Free tier available
- PostgreSQL support
- Easy Python deployment
- Auto HTTPS

### Deployment Steps

1. **Sign up:** https://railway.app/
2. **New Project** → **Deploy from GitHub repo**
3. **Select:** `Asmayaseen/hackathon-2-phase-1`
4. **Configure:**
   - **Root Directory:** `backend`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

5. **Add Environment Variables:**
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_9o7LbiyKpwrN@ep-divine-union-ahlsszpq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   BETTER_AUTH_SECRET=5Uk7VYMMiWOxhfeU1LCCWey2qQcpp1PX4sxFMQzKhGk=
   ALLOWED_ORIGINS=https://your-frontend.vercel.app
   PORT=8000
   ENVIRONMENT=production
   ```

6. **Deploy**

### Alternative: Render.com

1. Go to https://render.com/
2. New → Web Service
3. Connect GitHub repo
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add same environment variables
6. Deploy

---

## 🔗 Step 4: Connect Frontend to Backend

After both are deployed:

1. **Get Backend URL** from Railway/Render (e.g., `https://your-app.railway.app`)

2. **Update Frontend Environment Variables** on Vercel:
   - Go to Project Settings → Environment Variables
   - Update `NEXT_PUBLIC_API_URL` to your backend URL
   - Redeploy frontend

3. **Update Backend CORS:**
   - Update `ALLOWED_ORIGINS` to include your Vercel URL
   - Redeploy backend

---

## 🧪 Step 5: Test Deployed Application

### Backend Tests

```bash
# Health check
curl https://your-backend-url.com/health

# Should return:
# {"status":"healthy","version":"2.0.0","phase":"II"}
```

### Frontend Tests

1. Open: `https://your-app.vercel.app`
2. Click "Sign Up"
3. Create account
4. Login
5. Test CRUD operations:
   - Create task
   - Mark complete
   - Edit task
   - Delete task

---

## 📋 Deployment Checklist

### Pre-Deployment
- [x] Code complete
- [x] TypeScript passes
- [x] Git commit created
- [ ] Pushed to GitHub

### Frontend (Vercel)
- [ ] Project created on Vercel
- [ ] Root directory set to `frontend`
- [ ] Environment variables added
- [ ] Build successful
- [ ] Deployment URL obtained

### Backend (Railway/Render)
- [ ] Project created
- [ ] Root directory set to `backend`
- [ ] Environment variables added
- [ ] Build successful
- [ ] API URL obtained

### Integration
- [ ] Frontend NEXT_PUBLIC_API_URL updated
- [ ] Backend ALLOWED_ORIGINS updated
- [ ] CORS working
- [ ] Authentication working
- [ ] CRUD operations working

### Testing
- [ ] Can signup/login
- [ ] Can create tasks
- [ ] Can update tasks
- [ ] Can delete tasks
- [ ] Can toggle completion
- [ ] Data persists
- [ ] User isolation works

---

## 🎥 Step 6: Create Demo Video

Record a <90 second video showing:

1. **Landing Page** (5s)
2. **Signup** (10s)
3. **Login** (5s)
4. **Create Task** (15s)
5. **Mark Complete** (10s)
6. **Edit Task** (15s)
7. **Delete Task** (10s)
8. **Filter Tasks** (10s)
9. **Logout** (5s)

Tools: OBS Studio, Loom, or Screen Recorder

---

## 📤 Step 7: Submit to Hackathon

**Submission Form:** https://forms.gle/KMKEKaFUD6ZX4UtY8

**Required Information:**
- Name: Asma Yaseen
- GitHub URL: `https://github.com/Asmayaseen/hackathon-2-phase-1`
- Frontend URL: `https://your-app.vercel.app`
- Backend URL: `https://your-backend.railway.app`
- Demo Video: `https://youtube.com/...` or `https://loom.com/...`
- Phase: II - Full-Stack Web Application

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Problem:** Module not found

**Solution:**
```bash
# Check package.json is in frontend directory
cd frontend
npm install
npm run build  # Test locally first
```

### Backend Fails on Railway

**Problem:** Port binding error

**Solution:** Ensure start command uses `$PORT`:
```
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### CORS Errors

**Problem:** Frontend can't reach backend

**Solution:**
1. Add frontend URL to backend `ALLOWED_ORIGINS`
2. Ensure backend URL in frontend `NEXT_PUBLIC_API_URL`
3. Both must use HTTPS in production

### Database Connection Fails

**Problem:** Can't connect to Neon

**Solution:**
1. Check `DATABASE_URL` includes `?sslmode=require`
2. Verify Neon project is active
3. Check IP allowlist (Neon allows all by default)

---

## 🔑 Environment Variables Summary

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://[backend-url]
BETTER_AUTH_SECRET=5Uk7VYMMiWOxhfeU1LCCWey2qQcpp1PX4sxFMQzKhGk=
BETTER_AUTH_URL=https://[your-frontend].vercel.app
DATABASE_URL=postgresql://neondb_owner:npg_9o7LbiyKpwrN@ep-divine-union-ahlsszpq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Backend (Railway/Render)
```env
DATABASE_URL=postgresql://neondb_owner:npg_9o7LbiyKpwrN@ep-divine-union-ahlsszpq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
BETTER_AUTH_SECRET=5Uk7VYMMiWOxhfeU1LCCWey2qQcpp1PX4sxFMQzKhGk=
ALLOWED_ORIGINS=https://[your-frontend].vercel.app
PORT=8000
ENVIRONMENT=production
```

---

## 📊 Deployment Status

```
Code Implementation:   ████████████ 100% ✅
Git Commit:           ████████████ 100% ✅
GitHub Push:          ░░░░░░░░░░░░   0% ⏳ (Manual action required)
Vercel Deployment:    ░░░░░░░░░░░░   0% ⏳
Backend Deployment:   ░░░░░░░░░░░░   0% ⏳
Testing:              ░░░░░░░░░░░░   0% ⏳
Submission:           ░░░░░░░░░░░░   0% ⏳
```

---

## 🎯 Next Actions

1. **Push to GitHub** (requires your credentials)
   ```bash
   cd "/mnt/c/Users/S com/OneDrive/Desktop/hackathon-2-phase-1"
   git push origin master
   ```

2. **Deploy to Vercel** (via dashboard or CLI)

3. **Deploy to Railway** (easiest for Python backend)

4. **Test application**

5. **Record demo video**

6. **Submit to hackathon**

---

**All code is ready! Just need deployment!** 🚀

*Created: December 10, 2025*
*Phase II: Full-Stack Web Application*
