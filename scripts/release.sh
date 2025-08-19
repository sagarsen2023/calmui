#!/bin/bash

# Release script for calmui
# This script helps you create a new release and push to the release branch

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 CalmUI Release Script${NC}"

# Check if we're on main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo -e "${RED}❌ Please switch to main branch before releasing${NC}"
    exit 1
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ Working directory is not clean. Please commit or stash changes.${NC}"
    exit 1
fi

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
git pull origin main

# Get current version
current_version=$(node -p "require('./package.json').version")
echo -e "${YELLOW}📋 Current version: ${current_version}${NC}"

# Ask for new version
echo -e "${YELLOW}🔢 Enter new version (current: ${current_version}):${NC}"
read new_version

if [ -z "$new_version" ]; then
    echo -e "${RED}❌ Version cannot be empty${NC}"
    exit 1
fi

# Update package.json version
echo -e "${YELLOW}📝 Updating package.json version...${NC}"
npm version "$new_version" --no-git-tag-version

# Build the project
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build

# Commit version change
echo -e "${YELLOW}💾 Committing version change...${NC}"
git add package.json
git commit -m "chore: bump version to $new_version"

# Create and push tag
echo -e "${YELLOW}🏷️  Creating tag v${new_version}...${NC}"
git tag "v$new_version"

# Push main branch with tags
echo -e "${YELLOW}📤 Pushing to main branch...${NC}"
git push origin main --tags

# Switch to release branch (create if doesn't exist)
echo -e "${YELLOW}🔄 Switching to release branch...${NC}"
if git show-ref --quiet refs/heads/release; then
    git checkout release
    git merge main
else
    git checkout -b release
fi

# Push to release branch (this will trigger the publish workflow)
echo -e "${YELLOW}🚀 Pushing to release branch (this will trigger npm publish)...${NC}"
git push origin release

# Switch back to main
git checkout main

echo -e "${GREEN}✅ Release process completed!${NC}"
echo -e "${GREEN}📦 Package v${new_version} will be published to npm automatically.${NC}"
echo -e "${GREEN}🔍 Check the Actions tab in GitHub to monitor the publishing process.${NC}"