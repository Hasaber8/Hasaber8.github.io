---
title: "Git Basics"
date: 2020-05-28 22:00 +0000
---

### Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.  Which can be installed on your Windows/MacOS X/Linux computer! 

### Installation

1. For Windows Computers go ahead and download the Git client from https://git-scm.com/download/win , just accept all the permissions basically keep clicking ok until the installation is done, don’t change anything you don’t know.
2. For Linux Computers just open terminal and type “sudo apt-get install git” and enter, git will be installed in 1-2 minutes according to you internet connection.
3. For MacOS X Computers open terminal and type “brew install git” (Install homebrew if you don't already have it)

### Setup

1. Open the Git Bash client if you are on Windows, for Linux/MacOS X just open up the terminal.
2. Before anything you have to configure git for your Email it must be a GitHub/GitLab/BitBucket registered email, so when you push a commit (more on this later), your name will come up as the commit author.
3. The following commit will help you do that “git config --global user.name "Your Name" &  “git config --global user.email you@example.com”

###  Basic Git commands:-
        * git init
  	* git status
  	* git add
  	* git commit
  	* git rm
  	* git log
  	* .gitignore files
  	* git pull
        * git push
  	* git clone

1. Let’s start by making an empty folder name git-basics.
              ```bash
	      $ mkdir git-basic && cd git-basic
	      ```
