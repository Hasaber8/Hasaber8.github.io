#!/bin/bash

cd themes
git clone https://github.com/baalajimaestro/modified-hello-friend-ng hello-friend-ng
cd ..
curl -sLo hugo_0.64.0_Linux-64bit.deb https://github.com/gohugoio/hugo/releases/download/v0.64.0/hugo_0.64.0_Linux-64bit.deb
sudo dpkg -i hugo_0.64.0_Linux-64bit.deb
rm -rf hugo_0.64.0_Linux-64bit.deb
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
export BUILD_DIR=$(pwd)
cd ..
git clone https://github.com/Hasaber8/hasaber8.github.io -b master public
cd public
export PUBLIC=$(pwd)
git checkout -b master
cd $BUILD_DIR
hugo -d ../public

# Go To Public folder
cd $PUBLIC
# Add changes to git.
git config --global user.email "Rohanhasabe8@gmail.com"
git config --global user.name "Hasaber8"
git add .
# Commit changes.
msg="[HasabeCI]: Push Built Site"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git remote rm origin
git remote add origin https://hasaber8:${GH_PERSONAL_TOKEN}@github.com/Hasaber8/hasaber8.github.io
git push origin master

# Come Back up to the Project Root
cd ..
