# Quick Setup Guide for Your Academic Website

## Step-by-Step Deployment to GitHub Pages

### Prerequisites
- GitHub account
- Git installed on your computer
- Your profile photo ready

---

## 1. Prepare Your Profile Photo

```bash
# Copy your photo to the assets folder and rename it to profile.jpg
cp /path/to/your/photo.jpg assets/profile.jpg
```

**Recommended photo specs:**
- Format: JPG or PNG
- Size: 400x400 pixels or larger
- Aspect ratio: Square (1:1)
- File size: Under 500KB for faster loading

---

## 2. Update Your Google Scholar ID

1. Go to your [Google Scholar profile](https://scholar.google.com/)
2. Copy your profile URL - it looks like: `https://scholar.google.com/citations?user=XXXXX`
3. Copy the part after `user=` (this is your Scholar ID)
4. Open `index.html` in a text editor
5. Find and replace `YOUR_SCHOLAR_ID` with your actual ID (appears in 2-3 places)
6. Also update in `YOUR_ID` in the hero section links

---

## 3. Initialize Git Repository

Open Terminal/Command Prompt in the `personal_website` folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit: Academic portfolio website"
```

---

## 4. Create GitHub Repository

### Option A: Via GitHub Website
1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in top right > "New repository"
3. **Repository name:** `lavsendahal.github.io` (IMPORTANT: use this exact format)
4. **Description:** "Personal academic portfolio website"
5. **Visibility:** Public
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### Option B: Via GitHub CLI (if installed)
```bash
gh repo create lavsendahal.github.io --public --source=. --remote=origin
```

---

## 5. Push to GitHub

```bash
# Add remote repository
git remote add origin https://github.com/lavsendahal/lavsendahal.github.io.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If prompted for credentials:**
- Username: your GitHub username
- Password: use a [Personal Access Token](https://github.com/settings/tokens) (not your GitHub password)

---

## 6. Enable GitHub Pages (Usually Automatic)

GitHub should automatically deploy your site. To verify or configure:

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Source", ensure:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save" if needed

**Your site will be live at:** `https://lavsendahal.github.io`

**Deployment time:** Usually 2-5 minutes after pushing

---

## 7. Verify Deployment

1. Wait 2-5 minutes after pushing
2. Visit `https://lavsendahal.github.io`
3. Check that all sections load correctly
4. Test on mobile device or use browser dev tools

---

## 8. Making Updates

Whenever you want to update your website:

```bash
# Make changes to your files
# Then:

git add .
git commit -m "Description of your changes"
git push
```

Your site will automatically rebuild and deploy within 2-5 minutes.

---

## Common Issues & Solutions

### Issue: Site shows 404 error
**Solution:**
- Wait 5-10 minutes after first push
- Check repository name is exactly `lavsendahal.github.io`
- Verify `index.html` is in the root directory

### Issue: Changes not appearing
**Solution:**
- Wait a few minutes for GitHub to rebuild
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check your commit was successfully pushed: `git log`

### Issue: Publications not loading
**Solution:**
- This is normal - the site uses fallback publications
- Automatic fetching works better when deployed (vs local testing)
- You can manually update publications in `index.html` if needed

### Issue: Profile photo not showing
**Solution:**
- Verify file is at `assets/profile.jpg`
- Check file size is reasonable (< 2MB)
- Ensure file name is exactly `profile.jpg` (lowercase)
- Try different image format (JPG preferred)

### Issue: PDF viewer not working
**Solution:**
- Works better when deployed vs local testing
- Ensure PDF is in root directory
- File name matches: `Resume__Computer_Vision_.pdf`

---

## Optional: Add Custom Domain

If you want to use a custom domain like `www.lavsendahal.com`:

1. Buy domain from registrar (Namecheap, Google Domains, etc.)
2. In GitHub repo Settings > Pages > Custom domain
3. Enter your domain: `www.lavsendahal.com`
4. Add DNS records at your registrar:
   ```
   Type: CNAME
   Name: www
   Value: lavsendahal.github.io
   ```
5. Wait for DNS propagation (can take 24-48 hours)

---

## File Checklist

Before deploying, ensure you have:
- ✅ `index.html` - Main website file
- ✅ `styles.css` - All styling
- ✅ `script.js` - JavaScript functionality
- ✅ `config.js` - Configuration
- ✅ `Resume__Computer_Vision_.pdf` - Your CV
- ✅ `README.md` - Documentation
- ✅ `.gitignore` - Git ignore rules
- ✅ `assets/profile.jpg` - Your photo (YOU NEED TO ADD THIS)

---

## Testing Before Deployment

Test locally with a simple HTTP server:

```bash
# Python 3 (most common)
python3 -m http.server 8000

# OR Python 2
python -m SimpleHTTPServer 8000

# OR Node.js
npx http-server
```

Then visit `http://localhost:8000` in your browser.

---

## Need Help?

1. Check the main `README.md` for detailed documentation
2. Review GitHub Pages [documentation](https://docs.github.com/en/pages)
3. Open an issue on GitHub
4. Contact: lavsen.dahal@duke.edu

---

## Quick Command Reference

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/lavsendahal/lavsendahal.github.io.git
git push -u origin main

# Making updates
git add .
git commit -m "Update content"
git push

# Check status
git status
git log

# View remote
git remote -v
```

---

**You're all set! Your website should be live at https://lavsendahal.github.io within minutes of pushing to GitHub.**

Good luck with your academic portfolio! 🎓
