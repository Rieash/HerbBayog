# HerbBayog Deployment Guide

Complete guide for deploying HerbBayog to production.

## Architecture Overview

```
Frontend (React) ──► Backend (Django API) ──► PlantNet API (Identification)
                          │
                          ▼
                   PostgreSQL (Data)
```

- **Frontend**: React app on Netlify (free)
- **Backend**: Django REST API on Render (free)
- **Database**: PostgreSQL on Render (free tier)
- **Plant Identification**: PlantNet API (500 free requests/month)
- **Plant Data**: Your own database with DOH-approved herbs

---

## Prerequisites

1. GitHub account
2. Render account (https://render.com)
3. Netlify account (https://netlify.com)
4. PlantNet API key (already configured: 500 free requests/month)

---

## Step 1: Push Code to GitHub

### Initialize Repository

From your project root (`d:\HerbBayog`):

```bash
# Initialize git (if not already done)
git init

# Add all files (model files are excluded via .gitignore)
git add .

# Commit
git commit -m "HerbBayog v1.0 - Ready for deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/herbbayog.git
git push -u origin main
```

**Note**: The `.gitignore` already excludes:
- Virtual environments (`venv/`, `.venv/`)
- Model files (`*.h5`, `/models/`)
- Media uploads (`/media/`)
- Local databases (`db.sqlite3`)

---

## Step 2: Deploy Backend to Render

### 2.1 Create PostgreSQL Database

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `herbbayog-db`
   - **Plan**: Free ($0/month)
   - **Region**: Choose closest to your users (e.g., Singapore for Asia)
4. Click **Create Database**
5. **Copy the "Internal Database URL"** - you'll need it in step 2.3

### 2.2 Create Web Service

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository (`herbbayog`)
3. Configure settings:

| Setting | Value |
|---------|-------|
| **Name** | `herbbayog-api` |
| **Runtime** | Python 3 |
| **Region** | Same as your database |
| **Branch** | `main` |
| **Root Directory** | `backend` ⚠️ Important! |
| **Build Command** | `./build.sh` |
| **Start Command** | `gunicorn herbbayog.wsgi:application --bind 0.0.0.0:$PORT` |
| **Plan** | Free |

4. Click **Create Web Service**

### 2.3 Add Environment Variables

Go to your Web Service → **Environment** tab, add these:

| Key | Value | Notes |
|-----|-------|-------|
| `DJANGO_SETTINGS_MODULE` | `herbbayog.settings_prod` | Required |
| `DEBUG` | `False` | Production mode |
| `SECRET_KEY` | (Generate random) | Click "Generate" button |
| `DATABASE_URL` | (Paste from 2.1) | PostgreSQL connection |
| `FRONTEND_URL` | `https://your-frontend.netlify.app` | Update after frontend deploy |
| `PYTHON_VERSION` | `3.11.0` | Python version |

### 2.4 Deploy

1. Click **Manual Deploy** → **Deploy latest commit**
2. Watch the build logs - should show:
   - Installing dependencies
   - Collecting static files
   - Running migrations
   - Build successful
3. Once complete, your API URL will be: `https://herbbayog-api.onrender.com`

### 2.5 Test Backend

```bash
# Test health endpoint
curl https://herbbayog-api.onrender.com/api/plants/

# Should return JSON with plant list
```

---

## Step 3: Deploy Frontend to Netlify

### 3.1 Build Frontend Locally

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Build production bundle
npm run build
```

This creates a `build/` folder with your production app.

### 3.2 Deploy to Netlify

**Option A: Drag & Drop (Easiest)**

1. Go to https://app.netlify.com
2. Drag your `frontend/build` folder to the deploy area
3. Netlify will give you a URL like `https://herbbayog-123.netlify.app`

**Option B: Git Integration (Auto-deploy)**

1. In Netlify dashboard, click **"Add new site"** → **"Import an existing project"**
2. Connect GitHub → Select `herbbayog` repo
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
4. Click **Deploy site**

### 3.3 Update API URL

In your frontend, update the API endpoint:

**File**: `frontend/src/utils/api.js` (or wherever you set the base URL)

```javascript
const API_BASE_URL = 'https://herbbayog-api.onrender.com';
```

Or use environment variables:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

Then in Netlify environment variables, add:
```
REACT_APP_API_URL=https://herbbayog-api.onrender.com
```

### 3.4 Update CORS in Backend

Go back to your Render dashboard:

1. Update `FRONTEND_URL` environment variable with your actual Netlify URL
2. Click **Manual Deploy** to restart the service

---

## Step 4: Verify Everything Works

### Checklist

- [ ] Backend API responds: `https://herbbayog-api.onrender.com/api/plants/`
- [ ] Frontend loads: `https://your-app.netlify.app`
- [ ] Image upload works
- [ ] Plant identification returns results
- [ ] Plant details display correctly

### Common Issues

**CORS Errors**
- Make sure `FRONTEND_URL` in Render matches your Netlify URL exactly (including `https://`)
- Check `settings_prod.py` has CORS configured

**API Not Found**
- Check that `Root Directory` in Render is set to `backend`
- Verify `build.sh` is executable

**Database Connection Failed**
- Verify `DATABASE_URL` is copied correctly
- Make sure PostgreSQL service is running on Render

---

## Architecture Details

### How It Works

1. **User uploads image** → Frontend (Netlify)
2. **Frontend sends to backend** → `POST /api/classify/`
3. **Backend calls PlantNet API** → Free identification service
4. **PlantNet returns scientific name** → e.g., "Vitex negundo"
5. **Backend matches to your database** → "Lagundi"
6. **Returns plant details** → Uses, preparation, image from your database

### Data Flow

```
User Photo → [Netlify Frontend] → [Render Backend] → [PlantNet API]
                                              ↓
                                       [Match to DB]
                                              ↓
                                    [Return Plant Info]
                                              ↓
                                        [User Display]
```

### Your Database Includes

10 DOH-approved medicinal plants:
- Lagundi (Cough & Asthma)
- Sambong (Kidney Health)
- Bayabas (Wounds & Diarrhea)
- Ampalaya (Diabetes)
- Malunggay (Nutrition)
- Yerba Buena (Pain Relief)
- Bawang (Heart Health)
- Akapulko (Skin Diseases)
- Tsaang Gubat (Digestive)
- Tawa-tawa (Fever & Dengue)

Plus additional Philippine herbs.

---

## Free Tier Limits

### Render (Backend)
- **Web Service**: 512MB RAM, spins down after 15min idle
- **PostgreSQL**: 1GB storage, 90-day retention
- **Bandwidth**: 100GB/month

### Netlify (Frontend)
- **Build minutes**: 300 minutes/month
- **Bandwidth**: 100GB/month
- **Build size**: 15MB limit

### PlantNet API
- **Requests**: 500/month free
- **Rate limit**: Reasonable usage (no hard limit)

**Tips for staying within limits:**
- Add caching for plant database queries
- Compress images before upload
- Use lazy loading for plant images

---

## Custom Domain (Optional)

### Netlify
1. Go to Site settings → Domain management
2. Click **Add custom domain**
3. Enter your domain (e.g., `herbbayog.ph`)
4. Update DNS records as instructed

### Render
1. In Web Service settings, add custom domain
2. Update `FRONTEND_URL` environment variable

---

## Maintenance

### Update Deployments

**Backend changes:**
```bash
git add .
git commit -m "Backend update"
git push origin main
# Render auto-deploys
```

**Frontend changes:**
```bash
cd frontend
npm run build
# Re-drag to Netlify or push to Git
```

### Monitor Usage

- **Render Dashboard**: Check service logs and metrics
- **Netlify Dashboard**: Check bandwidth and build minutes
- **PlantNet**: Monitor API usage at https://my.plantnet.org/

---

## Support

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Django on Render**: https://render.com/docs/deploy-django
- **React on Netlify**: https://docs.netlify.com/integrations/frameworks/

---

**You're ready to deploy! 🚀**

Start with Step 1 (GitHub), then proceed to Render, then Netlify.
