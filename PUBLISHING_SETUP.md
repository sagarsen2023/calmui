# GitHub Actions NPM Publishing Setup

## Overview
Your repository is now configured to automatically publish your package to npm whenever you push to the `release` branch.

## Setup Complete ✅

### 1. GitHub Actions Workflow
- **Location**: `.github/workflows/publish-to-npm.yml`
- **Trigger**: Push to `release` branch or manual dispatch
- **Actions**: Builds the project and publishes to npm with provenance

### 2. Release Script
- **Location**: `scripts/release.sh`
- **Purpose**: Automates the release process
- **Usage**: `npm run release`

## Required: NPM Token Setup 🔑

To publish packages to npm, you need to set up an NPM_TOKEN secret in your GitHub repository:

### Step 1: Get Your NPM Token
1. Go to [npmjs.com](https://www.npmjs.com/) and log in
2. Click on your profile picture → "Access Tokens"
3. Click "Generate New Token" → "Classic Token"
4. Select "Automation" (recommended for CI/CD)
5. Copy the generated token

### Step 2: Add Token to GitHub Secrets
1. Go to your GitHub repository: `https://github.com/sagarsen2023/calmui`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click "Add secret"

## How to Release 🚀

### Option 1: Use the Release Script (Recommended)
```bash
npm run release
```

This script will:
- Check if you're on the main branch
- Pull latest changes
- Ask for a new version number
- Update package.json
- Build the project
- Commit and tag the version
- Push to release branch (triggers publishing)

### Option 2: Manual Release
```bash
# 1. Update version in package.json
npm version 1.0.3 --no-git-tag-version

# 2. Commit and push to main
git add package.json
git commit -m "chore: bump version to 1.0.3"
git push origin main

# 3. Switch to release branch and merge
git checkout release
git merge main
git push origin release
```

## Workflow Features 🛠️

- ✅ **Automatic Building**: Runs `npm run build` before publishing
- ✅ **Provenance**: Includes provenance statements for supply chain security
- ✅ **Public Access**: Publishes as a public package
- ✅ **Node 20.x**: Uses the latest LTS Node.js version
- ✅ **Manual Trigger**: Can be triggered manually from GitHub Actions tab

## Monitoring 📊

After pushing to the release branch:
1. Go to the **Actions** tab in your GitHub repository
2. Look for the "Publish Package to npmjs" workflow
3. Monitor the progress and check for any errors

## Troubleshooting 🔧

### Common Issues:
1. **NPM_TOKEN not set**: Add the token as described above
2. **Version already exists**: Make sure to increment the version number
3. **Build fails**: Ensure all tests pass and dependencies are installed
4. **Permission denied**: Check that your npm token has publish permissions

### Logs:
- Check GitHub Actions logs for detailed error messages
- Verify npm package page for successful publications

## Security Notes 🔒

- Never commit npm tokens to your repository
- Use "Automation" tokens for CI/CD (more secure than "Publish" tokens)
- Tokens are stored securely in GitHub Secrets
- Provenance statements help verify package authenticity
