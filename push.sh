#!/bin/bash
git remote rm origin
git remote add origin https://hasaber8:${GH_PERSONAL_TOKEN}@github.com/hasaber8/hasaber8.github.io
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"
hugo -d /public

# Go To Public folder

cd $PUBLIC

# Add changes to git.
git add .

# Commit changes.
git commit -m "[HasabeCI]: Push Built Site"

# Push source and build repos.
git push origin master