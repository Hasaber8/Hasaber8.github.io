---
title: "Git Basics Part - 1 (UNO)"
date: 2020-05-28
---

## Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency, which can be installed on your Windows/MacOS X/Linux computer!

## About Version Control
What is "version control", and why should you care? Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later. For the examples in this book, you will use software source code as the files being version controlled, though in reality you can do this with nearly any type of file on a computer.

## Installation

1. For Windows Computers, go ahead and download the Git client from https://git-scm.com/download/win , just accept all the permissions (basically keep clicking ok until the installation is done), don't change anything you don't know.

2. For Linux Computers, just open terminal and type
```bash
sudo apt-get install git
```
click enter and git will be installed.

3. For MacOS X Computers (Install homebrew if you don't have it already), open terminal and type 
```bash
brew install git
```

## Setup

1. Open the Git Bash client(from step 1 of installation) if you are on Windows. For Linux/MacOS X just open up the terminal.

2. Before proceeding you have to configure git to your Email. It must be a GitHub/GitLab/BitBucket registered email, so when you push a commit (more on this later), your name will come up as the commit author.

3. The following commit will help you do that 
```bash
git config --global user.name "Your Name"
```
&  
```bash
git config --global user.email "you@example.com"
```

## Basic Git commands:
* git init
* git status
* git add
* git commit
* git push
* git log
* git clone

## Baby steps

1. Let's start by making an empty folder named git-basics.
```bash
mkdir git-basics && cd git-basics
```

2. Let's understand what git init does before using it!

   The git init command is the first command that you will run on Git. The git init command is used to create a new blank repository. It is used to make an existing project as a Git project. The command given below will create a new subdirectory named ".git" that holds all necessary repository files.
```bash
git init
```

3. Next is the 'git add' command. 
   
   Now to understand how "git add" works you can either copy-paste a file into the folder we made or make a readme.md file. I have made a readme.md file in this example. The "git add" command is used to add file contents to the git structure. This command updates the current content of the folder and prepare it for the commit! 
```bash
git add . (The prefix changes according to the files you want to add. If you want to add all the file changes in the next commit, use the prefix "." . If you want to just add a specific file, use the "file" name as the prefix.)
```

4. Now we commit the changes we have made! 

   But before that, here's what "git commit" does; it is used to record the changes in the repository. It is the next command after the git add. Every commit contains the index data and the commit message.
```bash
git commit -m "My First Commit!" (-m subcommand is for the commit message. There are many more subcommands in "git commit" which we will cover later on in another guide.)
```

5. We have made our first commit, its time we push it. For this make an empty repository on Github.

6. Now we push the commit to the empty repository we made. The term 'push' refers to uploading the local repository content to a remote repository(in our case it's Github). Pushing is an act of transferring commits from your local repository to a remote repository. "git push" has many subcommands about which we will learn later on in another guide.
```bash
git push <"Link to your empty remote repository"> HEAD:master
```

7. With this you have successfully pushed your first commit! I hope, this wont be your last commit!

8. The advantage of a version control system is that it records changes. These records allow us to retrieve the data like commits, figuring out bugs, updates, etc. But, all of this history will be useless if we cannot navigate through it. At this point, we need the "git log" command.
"Git log" is a utility tool to review and read the history of everything that happens in a repository. Multiple options can be used with a git log to make history more specific.
```bash
git log
```

9. Last basic command everyone should know is "git clone".

"git clone" is a command-line utility which is used to make a local copy of a remote repository so you can work on it locally. It accesses the repository through a remote URL.
Usually, the original repository is located on a remote server, often from a Git service like GitHub, Bitbucket, or GitLab. The remote repository URL is referred to as the origin.

```bash
git clone <"Link of the repo you want to clone">
```

## Important Note:
There are alot of commands we haven't touched in this guide, but we will be covering that in-depth in the future.

Thank you note: 
1. https://www.javatpoint.com/git for their excellent in-depth notes on git.
2. https://github.com/baalajimaestro
