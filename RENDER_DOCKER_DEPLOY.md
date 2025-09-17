# 🚀 Docker Render Deployment Guide

## Using Your Existing API: https://instaclone-jg5h.onrender.com

## Step 1: Deploy Backend (Docker)

### 1.1 Create Web Service on Render
- Go to [render.com](https://render.com) → Sign up/Login with **new account**
- Click **"New +"** → **"Web Service"**
- Connect your GitHub repository
- Select your repo: `INSTACLONE`

### 1.2 Backend Docker Configuration
```
Name: instaclone-backend (or reuse instaclone-jg5h)
Runtime: Docker
Region: Any
Branch: main
Root Directory: backend
Dockerfile Path: backend/Dockerfile
```

### 1.3 Environment Variables (Backend)
Click **"Advanced"** → Add these environment variables:

```
MONGO_URI = mongodb+srv://parthasarathirautaray176:MhqD5CpN0oF3fiNQ@cluster0.acdck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SECRET_KEY = ioytwuoiwhgral9rfrjihfriifijlkva
API_KEY = [Your Cloudinary API Key from original .env]
API_SECRET = 2ppZhphqlZj-FRggwBicRPG-ajM
CLOUD_NAME = dsa3byenm
URL = https://your-new-frontend.onrender.com
PORT = 8000
NODE_ENV = production
```

---

## Step 2: Deploy Frontend (Docker)

### 2.1 Create Web Service for Frontend
- Click **"New +"** → **"Web Service"**
- Connect same GitHub repository

### 2.2 Frontend Docker Configuration
```
Name: instaclone-frontend
Runtime: Docker
Branch: main
Root Directory: frontend
Dockerfile Path: frontend/Dockerfile
```

### 2.3 Docker Build Arguments & Environment
**Build Arguments:**
```
VITE_API_URL = https://instaclone-jg5h.onrender.com
```

**Environment Variables:**
```
VITE_API_URL = https://instaclone-jg5h.onrender.com
```

---

## Step 3: Update Backend CORS

### 3.1 Update Backend URL Setting
- Go back to your **backend service** on Render
- Go to **Environment** tab
- Update the `URL` variable:
```
URL = https://your-actual-frontend-name.onrender.com
```
- Save → Backend will redeploy automatically

---

## 🎉 Your Docker Setup is Ready!

### Key Improvements Made:

✅ **Backend Dockerfile**: 
- Production optimized with `npm ci --only=production`
- Security: Non-root user
- Health checks added

✅ **Frontend Dockerfile**: 
- Uses your existing API URL: `https://instaclone-jg5h.onrender.com`
- Multi-stage build optimized
- Security hardened
- Health checks added

✅ **`.dockerignore` files**: 
- Optimized for smaller, faster builds
- Excludes unnecessary files

✅ **API Configuration**: 
- Frontend configured to use your existing backend
- Environment variable support

---

## 🔧 File Changes Summary:

- [`backend/Dockerfile`](file:///c:/Users/parth/OneDrive/Desktop/INSTAClONE/backend/Dockerfile) - Security & optimization improvements
- [`frontend/Dockerfile`](file:///c:/Users/parth/OneDrive/Desktop/INSTAClONE/frontend/Dockerfile) - Uses existing API URL
- [`backend/.dockerignore`](file:///c:/Users/parth/OneDrive/Desktop/INSTAClONE/backend/.dockerignore) - Optimized build context
- [`frontend/.dockerignore`](file:///c:/Users/parth/OneDrive/Desktop/INSTAClONE/frontend/.dockerignore) - Optimized build context
- [`frontend/src/config/api.js`](file:///c:/Users/parth/OneDrive/Desktop/INSTAClONE/frontend/src/config/api.js) - Uses existing backend URL
- [`docker-compose.yml`](file:///c:/Users/parth/OneDrive/Desktop/INSTAClONE/docker-compose.yml) - Updated for Render deployment
- [`render-docker.yaml`](file:///c:/Users/parth/OneDrive/Desktop/INSTAClONE/render-docker.yaml) - Infrastructure as code option

---

## 📋 Manual Deployment Steps:

### Backend .env file: 
Please manually update your backend `.env` file with:
```
URL=https://your-frontend-name.onrender.com
```

### Root .env file:
Please manually update your root `.env` file if needed for local development.

**Your Instagram clone is now ready for Docker deployment on Render!** 🚀
