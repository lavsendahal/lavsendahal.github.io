# Deploy to GitHub Pages - Quick Guide

## Prerequisites
- GitHub account
- Git installed on your computer

---

## Step 1: Initialize Git Repository

Open Terminal and navigate to your website folder:

```bash
cd /Users/ld258/Desktop/mage/personal_website
```

Initialize git and make first commit:

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Academic website"
```

---

## Step 2: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)

1. Go to https://github.com and log in
2. Click the "+" icon in top right > "New repository"
3. **Repository name:** `lavsendahal.github.io` (IMPORTANT: use this exact format)
4. **Description:** "Personal academic website"
5. **Visibility:** Public
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click "Create repository"

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create lavsendahal.github.io --public --source=. --remote=origin
```

---

## Step 3: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote repository
git remote add origin https://github.com/lavsendahal/lavsendahal.github.io.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**If prompted for credentials:**
- Username: your GitHub username
- Password: use a [Personal Access Token](https://github.com/settings/tokens) (not your password)

---

## Step 4: Enable GitHub Pages (Usually Automatic)

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in left sidebar
4. Under "Source", ensure:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"

---

## Step 5: Wait and Visit Your Site

- **Deployment time:** 2-5 minutes
- **Your URL:** https://lavsendahal.github.io

You'll see a green checkmark in the repository when it's deployed.

---

## Making Updates Later

Whenever you want to update your website:

```bash
# Make your changes to files, then:
git add .
git commit -m "Update content"
git push
```

The site will automatically rebuild and deploy in 2-5 minutes.

---

## Common Issues

### Issue: "Repository already exists"
**Solution:** The repository name must be exactly `lavsendahal.github.io`. Delete any existing repo with this name first.

### Issue: 404 error when visiting site
**Solution:**
- Wait 5-10 minutes after first push
- Check that `index.html` is in the root directory
- Verify repository name is correct

### Issue: "Permission denied"
**Solution:** Create a Personal Access Token:
1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate new token
3. Select "repo" scope
4. Use this token as password when pushing

### Issue: Changes not showing
**Solution:**
- Wait a few minutes for rebuild
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check GitHub Actions tab for build status

---

## Verification

After deployment, check:
- [ ] Site loads at https://lavsendahal.github.io
- [ ] Profile photo shows correctly
- [ ] All links work
- [ ] Publications page loads
- [ ] CV PDF opens
- [ ] Mobile responsive (test on phone)

---

## Optional: Custom Domain

If you want to use your own domain (like www.lavsendahal.com):

1. Buy a domain from a registrar (Namecheap, Google Domains, etc.)
2. In GitHub repo Settings > Pages > Custom domain, enter: `www.lavsendahal.com`
3. In your domain registrar's DNS settings, add:
   ```
   Type: CNAME
   Name: www
   Value: lavsendahal.github.io
   ```
4. Wait 24-48 hours for DNS propagation

---

**That's it! Your website will be live at https://lavsendahal.github.io**
