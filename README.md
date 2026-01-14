# Lift - Workout Tracker PWA

A brutalist, offline-first Progressive Web App for tracking strength training workouts.

## Features
- ✅ Offline-first (works without internet)
- ✅ Track compound lifts & accessories
- ✅ View PRs with estimated 1RM calculations
- ✅ Visualize progress trends
- ✅ Export/import data (JSON & CSV)
- ✅ Dark slate + burnt orange aesthetic

## Deploy to GitHub Pages

### Option 1: Using GitHub Web Interface (Easiest)

1. **Create a new GitHub repository**
   - Go to https://github.com/new
   - Name it something like `lift-tracker`
   - Make it Public
   - Click "Create repository"

2. **Upload files**
   - Click "uploading an existing file"
   - Drag and drop ALL files from the `pwa` folder:
     - index.html
     - manifest.json
     - service-worker.js
     - icon-192.png
     - icon-512.png
   - Click "Commit changes"

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Under "Source", select "main" branch
   - Click Save
   - Wait 2-3 minutes

4. **Your app is live!**
   - URL will be: `https://YOUR-USERNAME.github.io/lift-tracker`
   - Visit this URL on your iPhone
   - Tap Share → Add to Home Screen

### Option 2: Using Git Command Line

```bash
# Navigate to the pwa folder
cd /path/to/pwa

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub (create repo first on github.com)
git remote add origin https://github.com/YOUR-USERNAME/lift-tracker.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repo settings
```

### Option 3: Using Netlify Drop (Alternative to GitHub)

1. Go to https://app.netlify.com/drop
2. Drag the entire `pwa` folder onto the page
3. Get instant URL like `random-name-12345.netlify.app`
4. Visit on iPhone → Add to Home Screen

## Local Testing

To test locally before deploying:

```bash
# Using Python
cd pwa
python3 -m http.server 8000

# Or using Node.js
npx http-server pwa -p 8000
```

Then visit `http://localhost:8000` in your browser.

## File Structure

```
pwa/
├── index.html           # Main app file
├── manifest.json        # PWA manifest
├── service-worker.js    # Offline caching
├── icon-192.png        # App icon (192x192)
├── icon-512.png        # App icon (512x512)
└── README.md           # This file
```

## Color Scheme

- Background: `#2d2d34` (Dark slate)
- Primary: `#D55B3A` (Burnt orange - darker)
- Headers: `#EE6C4D` (Burnt orange - brighter)
- Accent: `#F4E8D0` (Warm cream)
- Text: `#E8E8E8` (Off-white)

## Typography

- Headings: Bebas Neue
- Numbers: IBM Plex Mono
- UI Text: Space Grotesk
