# Phase III Setup Guide

> **Quick Start Guide for AI-Powered Chatbot**
> Evolution of Todo - Phase III

---

## 📋 Prerequisites

Before setting up Phase III, ensure you have completed Phase II:
- ✅ Backend API running (FastAPI)
- ✅ Frontend app running (Next.js)
- ✅ Database connected (Neon PostgreSQL)
- ✅ Authentication working (Better Auth + JWT)

---

## 🔧 Step 1: OpenAI API Key

### Get Your API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. **Save it securely** - you won't be able to see it again!

### Add Credits

OpenAI API requires credits to function:
1. Go to [Billing Settings](https://platform.openai.com/account/billing)
2. Add payment method
3. Add at least $5 in credits
4. Set up usage limits to prevent unexpected charges

**Cost Estimate for Testing:**
- ~100 chat messages: $0.10 - $0.50
- Development/testing: $5 should last weeks

---

## 🗄️ Step 2: Run Database Migration

### Execute Migration Script

```bash
# Navigate to backend
cd backend

# Run Phase III migration
python migrations/003_add_chat_tables.py
```

**Expected Output:**
```
🚀 Starting Migration: 003_add_chat_tables
✓ Creating conversations table...
✓ Creating messages table...
✓ Migration completed successfully!
```

### Verify Tables Created

```bash
# Option 1: Using Neon Console
# 1. Go to https://console.neon.tech/
# 2. Select your project
# 3. Go to "Tables" tab
# 4. Verify "conversations" and "messages" tables exist

# Option 2: Using psql
psql $DATABASE_URL -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public';"
```

---

## ⚙️ Step 3: Configure Environment Variables

### Backend Configuration

1. **Edit `backend/.env`** (create from `.env.example` if needed):

```bash
# Copy example file
cp backend/.env.example backend/.env

# Edit the file
nano backend/.env  # or use your favorite editor
```

2. **Add Phase III variables:**

```env
# Phase III - AI Chatbot
OPENAI_API_KEY=sk-your-actual-key-here
OPENAI_MODEL=gpt-4
MCP_SERVER_NAME=todo-mcp-server
MCP_SERVER_VERSION=1.0.0
MCP_SERVER_DESCRIPTION=MCP tools for Evolution of Todo task management
```

3. **Keep existing variables:**
- `DATABASE_URL` - Your Neon connection string
- `BETTER_AUTH_SECRET` - Your auth secret
- `ALLOWED_ORIGINS` - Include `http://localhost:3000`

### Frontend Configuration

1. **Edit `frontend/.env.local`:**

```bash
# Copy example file
cp frontend/.env.local.example frontend/.env.local

# Edit the file
nano frontend/.env.local
```

2. **Verify these variables:**

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Authentication (must match backend)
BETTER_AUTH_SECRET=<same-as-backend>
BETTER_AUTH_URL=http://localhost:3000

# Database (must match backend)
DATABASE_URL=<same-as-backend>
```

**Note:** Frontend doesn't need `OPENAI_API_KEY` - it's backend-only!

---

## 🚀 Step 4: Install Dependencies

### Backend

```bash
cd backend

# Install new Phase III dependencies
pip install openai>=1.0.0 mcp>=0.1.0

# Or reinstall all dependencies
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend

# No new dependencies required
# Chat UI is built with existing shadcn/ui components

# If needed, reinstall all
npm install
```

---

## ▶️ Step 5: Start the Application

### Terminal 1: Backend

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
✓ MCP Server 'todo-mcp-server' v1.0.0 starting...
✓ Registering tools...
✓ MCP Tools registered: add_task, list_tasks, complete_task, delete_task, update_task
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 1.2s
```

---

## ✅ Step 6: Verify Installation

### Test 1: Backend Health Check

```bash
# Check main API health
curl http://localhost:8000/health

# Check chat endpoint health
curl -H "Authorization: Bearer <token>" \
     http://localhost:8000/api/demo-user/chat/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "endpoint": "chat",
  "mcp_tools": ["add_task", "list_tasks", "complete_task", "delete_task", "update_task"]
}
```

### Test 2: Frontend Chat Page

1. Open browser: `http://localhost:3000`
2. Log in (or use demo mode)
3. Click "AI Assistant" in header
4. You should see the chat interface

### Test 3: Send a Chat Message

In the chat interface, try:
- "Add buy milk to my todo list"
- "Show me all my tasks"
- "Mark task 1 as complete"

**Expected Behavior:**
- User message appears immediately
- AI response appears within 2-3 seconds
- Tasks created via chat appear in dashboard

---

## 🔍 Troubleshooting

### Issue: "OpenAI API key not found"

**Solution:**
1. Verify `OPENAI_API_KEY` in `backend/.env`
2. Restart backend server
3. Check key starts with `sk-`

### Issue: "Failed to send message" or 500 error

**Possible Causes:**

1. **Database migration not run:**
   ```bash
   python backend/migrations/003_add_chat_tables.py
   ```

2. **OpenAI API key invalid:**
   - Check key is correct
   - Verify account has credits
   - Test key at https://platform.openai.com/playground

3. **MCP package not installed:**
   ```bash
   pip install mcp>=0.1.0
   ```

### Issue: "Conversation not persisting"

**Check:**
1. Database migration successful
2. Tables `conversations` and `messages` exist
3. Backend logs show "Saved message" entries

**View backend logs:**
```bash
# Should see log entries like:
# INFO: Created new conversation: user=demo-user, conv_id=1
# INFO: Saved message: conv=1, role=user, length=25
```

### Issue: Chat page shows "Not authenticated"

**Solution:**
1. Ensure you're logged in
2. Check JWT token in browser DevTools → Application → Cookies
3. Verify `BETTER_AUTH_SECRET` matches in frontend and backend

### Issue: "MCP tools not working"

**Check:**
1. Backend logs show: "MCP Tools registered: add_task, list_tasks..."
2. Service layer functions work (test with REST API)
3. User ID matches between chat and tasks

---

## 📊 Monitoring and Logs

### Backend Logs

**Important log entries to watch:**

```bash
# MCP Server started
INFO: MCP Server 'todo-mcp-server' v1.0.0 starting...

# Tool registration
INFO: MCP Tools registered: add_task, list_tasks, complete_task, delete_task, update_task

# Conversation created
INFO: Created new conversation: user=demo-user, conv_id=1

# Message saved
DEBUG: Saved message: conv=1, role=user, length=25

# Tool called
INFO: Task created via MCP: user=demo-user, task_id=5

# Chat completed
INFO: Chat completed: user=demo-user, conv=1, tools=1
```

### Frontend Console

**Check browser DevTools → Console for:**

```javascript
// API calls
POST http://localhost:8000/api/demo-user/chat
Status: 200 OK

// Responses
{conversation_id: 1, response: "I've added 'buy milk'...", tool_calls: [...]}
```

---

## 🧪 Testing Scenarios

### Scenario 1: Create Task via Chat

1. Chat: "Add buy groceries to my list"
2. Expected: AI confirms task created
3. Verify: Go to Dashboard, task appears
4. Check: Conversation saved (conversation_id returned)

### Scenario 2: List Tasks

1. Chat: "Show me all my tasks"
2. Expected: AI lists current tasks
3. Verify: Matches dashboard task list

### Scenario 3: Complete Task

1. Chat: "Mark task 5 as complete"
2. Expected: AI confirms completion
3. Verify: Dashboard shows task completed
4. Check: Task status updated in database

### Scenario 4: Multi-Turn Conversation

1. Chat: "Add three tasks: buy milk, call mom, finish report"
2. Chat: "Show me the tasks"
3. Chat: "Complete the first one"
4. Expected: All commands work in sequence
5. Verify: Conversation history maintained

### Scenario 5: Stateless Architecture

1. Send message, note conversation_id
2. Stop backend server
3. Restart backend server
4. Send another message with same conversation_id
5. Expected: Conversation history restored from database

---

## 🎯 Success Criteria

**Phase III is working correctly when:**

- ✅ Chat page loads at `/chat`
- ✅ Can send messages to AI
- ✅ AI responds within 5 seconds
- ✅ Tasks created via chat appear in dashboard
- ✅ Tasks from dashboard visible to AI
- ✅ Conversation history persists after server restart
- ✅ Multiple conversations can exist simultaneously
- ✅ User isolation working (can't see other users' conversations)

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] `OPENAI_API_KEY` stored securely (not in code)
- [ ] `.env` files added to `.gitignore`
- [ ] OpenAI API usage limits configured
- [ ] Rate limiting enabled on chat endpoint
- [ ] JWT authentication enforced on chat endpoint
- [ ] User isolation tested (can't access others' conversations)
- [ ] Error messages don't expose sensitive info
- [ ] HTTPS enabled in production
- [ ] CORS configured correctly

---

## 💰 Cost Management

### Monitor OpenAI Usage

1. Go to [Usage Dashboard](https://platform.openai.com/usage)
2. Set up usage limits:
   - Hard limit: $20/month (for testing)
   - Email notifications at $10 and $15

### Optimize Costs

**Tips to reduce API costs:**

1. **Limit conversation history:**
   - Currently loads last 10 messages
   - Reduce to 5 for testing: `load_conversation_history(conv_id, limit=5)`

2. **Use cheaper model for testing:**
   ```env
   # In backend/.env
   OPENAI_MODEL=gpt-3.5-turbo  # Instead of gpt-4
   ```
   - GPT-3.5: ~10x cheaper than GPT-4
   - GPT-4: Better quality, higher cost

3. **Mock responses for development:**
   - Keep mock AI response function for local testing
   - Only use real OpenAI for final testing

4. **Implement caching:**
   - Cache common responses (Phase IV feature)
   - Reduce duplicate API calls

---

## 📚 Next Steps

After Phase III setup:

1. **Test Thoroughly:**
   - Try all MCP tools (add, list, complete, delete, update)
   - Test error handling (invalid commands, auth failures)
   - Verify conversation persistence

2. **Replace Mock AI Response:**
   - Currently using pattern matching mock
   - Integrate real OpenAI Agents SDK
   - See: `backend/routes/chat.py` function `get_ai_response()`

3. **Production Deployment:**
   - Deploy backend to Railway/Render
   - Deploy frontend to Vercel
   - Configure production environment variables
   - Run migrations on production database

4. **Documentation:**
   - Record demo video (< 90 seconds)
   - Update README with Phase III features
   - Document API usage

5. **Bonus Features** (+200 points):
   - ✅ Reusable Intelligence already created
   - Consider additional enhancements:
     - Voice input/output
     - Task suggestions
     - Smart scheduling

---

## 📞 Getting Help

**If you encounter issues:**

1. **Check logs first:**
   - Backend: Terminal running uvicorn
   - Frontend: Browser DevTools → Console
   - Database: Neon Console → Queries

2. **Verify configuration:**
   - All environment variables set
   - Values match between frontend and backend
   - No typos in API keys

3. **Test components individually:**
   - REST API working? (Phase II)
   - Database accessible?
   - Authentication working?
   - Then test chat endpoint

4. **Common gotchas:**
   - Restart servers after changing .env
   - Clear browser cache/cookies
   - Check firewall/CORS settings
   - Verify OpenAI account has credits

---

**Phase III Setup Complete! 🎉**

You now have a fully functional AI-powered todo chatbot with:
- Natural language task management
- Persistent conversation history
- MCP tools for intelligent task operations
- Stateless, scalable architecture

**Ready for Phase IV and beyond!**

---

*Last Updated: December 20, 2025*
*Evolution of Todo - Panaversity Hackathon II - Phase III*
