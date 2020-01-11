#!/bin/bash

cd themes
git clone https://github.com/baalajimaestro/modified-hello-friend-ng hello-friend-ng
cd ..
curl -sLo hugo_0.62.2_Linux-64bit.deb https://github.com/gohugoio/hugo/releases/download/v0.62.2/hugo_0.62.2_Linux-64bit.deb
sudo dpkg -i hugo_0.62.2_Linux-64bit.deb
rm -rf hugo_0.62.2_Linux-64bit.deb
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
export BUILD_DIR=$(pwd)
cd ..
git clone https://github.com/baalajimaestro/baalajimaestro.github.io -b master public
cd public
export PUBLIC=$(pwd)
git checkout -b master
cd $BUILD_DIR
hugo -d ../public

# Go To Public folder
cd $PUBLIC
# Add changes to git.
git config --global user.email "baalajimaestro@raphielgang.org"
git config --global user.name "baalajimaestro"
git add .
# Commit changes.
msg="[MaestroCI]: Push Built Site"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git remote rm origin
git remote add origin https://baalajimaestro:${GH_PERSONAL_TOKEN}@github.com/baalajimaestro/baalajimaestro.github.io
git push origin master

# Come Back up to the Project Root
cd ..
