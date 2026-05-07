# HerbBayog Deployment Guide

## 🚀 Quick Deployment to Netlify

### Prerequisites
- Netlify account (free tier is sufficient)
- Git repository initialized
- Node.js installed on your machine

### Step 1: Build for Production
```bash
cd frontend
npm run build
```

### Step 2: Deploy to Netlify
```bash
# Option A: Drag and drop (Easiest)
1. Open [Netlify](https://app.netlify.com/drop)
2. Drag your `frontend/build` folder into the deploy area
3. Netlify will detect it's a React app and deploy automatically

# Option B: Netlify CLI (Recommended)
1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod --dir=frontend/build
```

### Environment Variables (if needed)
Set these in Netlify dashboard:
- `REACT_APP_API_URL`: Your backend API URL
- `REACT_APP_ENVIRONMENT`: `production`

### 📁 File Structure After Build
```
frontend/
├── build/
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── media/
│   ├── index.html
│   └── ...
├── package.json
└── netlify.toml (create this)
```

### 🔧 Create netlify.toml
Create this file in your root directory:
```toml
[build]
  publish = "build"
  command = "npm run build"

[build.environment]
  REACT_APP_API_URL = "https://your-backend-url.com"
  REACT_APP_ENVIRONMENT = "production"
```

### 🌐 Deployment URL
Your app will be available at: `https://your-app-name.netlify.app`

### 📱 Testing Your Deployment
1. Check all pages load correctly
2. Test plant identification feature
3. Test herbal/non-herbal badges
4. Test Calbayog local section
5. Test language switching (English/Waray)

### 🔄 Automatic Deployments
Set up GitHub connected to Netlify for automatic deployments on push to main branch.

### 🐛 Troubleshooting
If build fails:
```bash
# Clear cache
npm start --reset-cache

# Delete node_modules
rm -rf node_modules package-lock.json
npm install
npm run build
```

Common issues:
- API URL not accessible - check CORS settings
- Images not loading - check image paths in backend
- White screen - check browser console for errors

---

## 📞 Support
For issues:
- Netlify docs: https://docs.netlify.com/
- React deployment: https://react.dev/learn/start-deploying/

Happy deploying! 🌿✨
