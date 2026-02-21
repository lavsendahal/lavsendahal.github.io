# Quick Start - 3 Steps to Deploy

## Your website is ready! Just do these 3 things:

### Step 1: Add Your Photo (2 minutes)
```bash
# Copy your profile photo to the assets folder
cp /path/to/your/photo.jpg assets/profile.jpg
```

### Step 2: Update Google Scholar ID (1 minute)
1. Go to your Google Scholar profile
2. Copy your ID from the URL (the part after `user=`)
3. Open `index.html` in any text editor
4. Replace `YOUR_SCHOLAR_ID` with your actual ID (2-3 places)

### Step 3: Deploy to GitHub Pages (5 minutes)
```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit: Academic portfolio"
git remote add origin https://github.com/lavsendahal/lavsendahal.github.io.git
git branch -M main
git push -u origin main
```

**That's it!** Your site will be live at `https://lavsendahal.github.io` in 2-5 minutes.

---

## Preview Locally First (Optional)

```bash
# Run a local server
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

---

## What's Included

✅ Responsive design (mobile, tablet, desktop)
✅ Auto-fetch publications from Google Scholar
✅ Your CV embedded with download option
✅ Projects portfolio section
✅ Invited talks timeline
✅ About me and research interests
✅ Contact section with social links
✅ Professional styling and animations

---

## Files Overview

- `index.html` - Main website (23 KB)
- `styles.css` - All styling (17 KB)
- `script.js` - Functionality (10 KB)
- `config.js` - Easy configuration (6 KB)
- `Resume__Computer_Vision_.pdf` - Your CV (186 KB)
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Detailed deployment guide
- `FEATURES.md` - Complete feature list

---

## Need More Help?

1. **Detailed Setup**: Read `SETUP_GUIDE.md`
2. **Features**: Check `FEATURES.md`
3. **Full Docs**: See `README.md`

---

**You're all set! 🚀**
