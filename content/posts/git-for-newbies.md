---
title: "Git For Newbies"
date: 2019-06-18T12:29:41+08:00
---

Before we start make sure `git --version` command successfully returns. If the output is something like **command not found** then please make sure Git is properly installed on your machine. My machine output is shown below. **Output on your machine might be different.**

> **Commands that a user should type on his/her terminal are prefixed with the shell prompt symbol `$`. The output of command follows the command. Also, you don't have to type `$` on your terminal.**

Please be nice to Mr.Git. Introduce yourself to him. Else git will blame you for not introducing yourself `please tell me who you are!`

```bash
$ git config --global user.name "Your name"
$ git config --global user.email "Your email"
```

The command shown above populates a file named `.gitconfig` in your user home directory with configuration information.

```bash
$ cat ~/.gitconfig
```
```
[user]
	name = baalajimaestro
	email = baalajimaestro@computer4u.com
```

## Table of Contents

* Why version control system?
* What the heck is Git?
* Git basics
  * git init
  * git status
  * git add
  * git commit
  * git rm
  * git log
  * .gitignore files
* Working with branches
  * git branch
  * git checkout
  * git merge
* Working with remote repositories
  * git remote
  * git pull
  * git push
  * git clone
* Github basics
  * Why and What Pull Requests?
* Advanced topics
  * git rebase
  * git cherry-pick
  * git alias
* Useful Git commands


VCS: Version Control System
----

A version control system is a kind of database for storing your software project source code. It lets you save a snapshot of your complete project at any time you want. When you later take a look at an older snapshot (let's start calling it "version").

You can use version control system to store:

1. Software source code
2. Text files
3. Writing books
4. Sharing datasets


## Why version control system?

You should use version control because it offers the below:

1. Collaboration among a team of Coders
2. Versioning the code. Could create multiple branches to setup binary releases
3. Restoring to previous versions
4. Tracking the history (who to blame!)
5. Backup. Old style backup methodologies like email storage, local file system or FTP backup are cumbersome.


## What the heck is Git?

Git is a distributed version control system. It was developed by Linus Torvalds in 2005 for linux developers and is being maintained by a large community across the world.

Every Git working directory is a full-fledged repository with complete history and full version-tracking capabilities, independent of network access or a central server.

<img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg" width="150" height="150">

Distributed or Decentralized VCS allows many software developers to work on a project without requiring them to share a common network.

## Git basics

Let's start by creating an empty directory `git-basic`. Navigate to a convenient location on your local file system and create a new directory.

```bash
$ mkdir git-basic && cd git-basic
```

### git init

To make any repository a Git managed repository, you can type the following command. These commands should be typed from inside the `git-basic` directory.

```bash
$ git init
```
```
Initialized empty Git repository in ~/git-basic/.git/
```

This will create a directory named `.git` inside the `git-basic` directory.

`.git` is a directory where Git stores all the data. **Don't mess with the `.git` directory.**

If you want to override user for this repository, then you can add user section by either editing `.git/config` file or using the `git config --local` command.

```bash
$ git config --local user.name "Shekhar 123"
```

If you view the contents of the `.git/config` file now, then you will see your change.

### git status

Time and again we will need to know status of our Git repository. By status what we mean is the current state of the repository. E.g., what needs to be added to the index, what needs to be committed, if there is any change that we have to commit, etc., This is the command that you will use the most.

```bash
$ git status
```

```
On branch master

Initial commit

nothing to commit (create/copy files and use "git add" to track)
```

### git add

Let's create a new file `README.md` and add a dummy message.

```bash
$ echo "# Git Basics" >> README.md
```

> **It is a good practice to create a file named README.md in your repository root that tells the purpose of the repository.**

Now, check the status of the Git repository.

```bash
$ git status
```
```
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	README.md

nothing added to commit but untracked files present (use "git add" to track)
```

**git add** stages the changes so they are picked up by the next commit. In Git, you can't commit something until its tracked.

```bash
$ git add README.md
```

Now, check the status of your Git repository.

```bash
$ git status
```

```
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   README.md
```

> **If you have multiple files then you can use `git add <file1> <file2> .. <filen>` or `git add --all` or `git add -A` to stage them in one command.**

### git commit

Once you have a smallest working change, you should commit it to your version control system. Smallest working change could be a test case, a small piece of functional code, a line or paragraph in your text file, etc. **You should commit often and daily.** Also, every commit should strive to do exactly one change.

After staging your changes, next step is to commit them into your local Git repository. To do that, we will use commit command as shown below.

```bash
$ git commit -m "first commit"
```
```
[master (root-commit) 3d34eb3] first commit
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
```

Staging and committing are two different steps in Git. You can't commit a change until it has been staged. If you are working with a tracked file, then you can do both of these steps in a single command.

```bash
$ echo "This is my Git."  >> README.md
```

Check the status of your repository. This time it will say it is a **modified** change.

```bash
$ git status
```
```
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

To stage and commit a change in a tracked file, you can use following command.

```bash
$ git commit -am "second commit"
```

### git rm

Let's suppose we added a bad file to the Git index that we want to remove.

```bash
$ echo "my stupid file" >> stupid.txt
$ git add stupid.txt
```

To remove such a file from the Git index, we can use Git `rm` command.

```bash
$ git rm -f stupid.txt
```
To remove directories,

```bash
$ git rm -rf crap
```

### git log

To view history of your commit logs, use the following command.

```bash
$ git log
```

If you want to see a commit in one line, then use `--oneline` option.

```bash
$ git log --oneline
```

There are many more options. You can refer to help `git help log` for more details.

### .gitignore files

Every Git repository should have another configuration file `.gitignore` present in the root i.e. directly inside the `git-basic` directory. This file is used to specify files and file patterns that you want git to ignore .

```bash
$ echo "*.log" >> .gitignore
$ echo "target/" >> .gitignore
$ echo "dummy.txt" >> .gitignore
```

1. The first pattern says any file with extension `log` will ignored.
2. The second pattern says directory with name `target` will be ignored.
3. The third pattern means file with name `dummy.txt` will be ignored.

Now add and commit the `.gitignore` to your Git repository.

```bash
$ git add .gitignore
$ git commit -m "Adding .gitignore file"
```

## Working with branches

A branch represents an independent line of development. You use branch for following:

1. Develop a new feature. Once you are done with the feature, it can be merged into your main branch.
2. Fix a bug.
3. Your experiment playground.

By default, every git repository has one branch called **master**. When you create a new branch, you get a new development workspace. Any change that you make to the new working directory has no impact on your previous working directory.

### git branch

**git branch** command lets you work with Git branches.

To view all the branches, you execute following command.

```bash
$ git branch
* master
```

> **branch marked with a * is the current branch.**

Let's suppose we have to implement some new functionality. To work on new functionality, we create a new branch called `feature1`.

```bash
$ git branch feature1
```

You can view branch list again.

```
$ git branch
  feature1
* master
```

One thing that is important to understand here is Git branches are just pointers to commits. When you create a branch, all Git needs to do is create a new pointer; it doesn’t change the repository in any other way.

```bash
$ git log --oneline --decorate
```


### git checkout

To switch to a branch, you use checkout command.

```bash
$ git checkout feature1
```

The `git checkout` command lets you navigate between the branches created by git branch.

To create a new branch and checkout it in one command

```bash
$ git checkout -b feature1
```

Let's add our new feature now.

```bash
$ echo "I will read a Git tutorial today to make sure I understand Git thoroughly." >> README.md
```

Commit it to the `feature1` branch.

```bash
$ git commit -am "fifth commit. Read tutorial"
```

### git merge (ff)

Once we are done with our feature, we can merge it back to master. First, we'll switch to `master` branch.

```bash
$ git checkout master
```

**git merge** command allows you to merge an independent development line created by `git branch` into a single branch.

> git merge will merge into the current branch.

To merge `feature1` branch into `master` branch, execute the following command.

```bash
$ git merge feature1
```

```bash
$ git log --oneline --decorate
```

> the default merge algorithm is ff i.e fast forward. When the merge resolves as a fast-forward, only update the branch pointer, without creating a merge commit. This is the default behavior.

A **fast-forward** merge can occur when there is a linear path from the current branch tip to the target branch.

Now that we are done with `feature1` branch, let's delete it.

```bash
$ git branch -d feature1
```

### git merge (--no-ff)

Create another new branch `feature2` and add a new commit.

```bash
$ git checkout -b feature2
$ echo "I will watch a Git video by Linus Torvalds https://www.youtube.com/watch?v=4XpnKHJAok8" >> README.md
$ git commit -am "sixth commit. Watch video."
```

Now checkout master again.

```bash
$ git checkout master
```

The `--no-ff` algorithm always generate a merge commit (even if it was a fast-forward merge)

```bash
$ git merge --no-ff feature2
```

View logs of master

```bash
$ git log --oneline --decorate
```

The interesting bit is that it created a merge commit. Git uses Three-way merge algorithm.

1. the `MERGE_HEAD` commit i.e. the modification that we want to merge
2. the `HEAD` commit i.e. the branch in which the `MERGE_HEAD` will be merged i.e. the branch on which the git merge command is called
3. the `ORIG_HEAD` commit i.e. the best common ancestor of `MERGE_HEAD` and `HEAD` that will serve as the reference.

Delete the feature branch `feature2`

```bash
$ git branch -d feature2
```

### git merge (commits in both master and branch)

Create another new branch `feature2` and add a new commit.

```bash
$ git checkout -b feature3
$ echo "I will try Git using tutorial https://try.github.io/" >> README.md
$ git commit -am "seventh commit. Try Git."
```

Checkout master branch and edit an existing line.

```bash
$ git checkout master
```

Change **I will read a Git tutorial today to make sure I understand Git thoroughly.** to **I will read a Git tutorial https://www.atlassian.com/git/tutorials/.**

```bash
$ cat README.md
```
```
# Git Playground
This is my Git playground.
I will learn Git today during the XKE.
I will read a Git tutorial https://www.atlassian.com/git/tutorials/.
I will watch a Git video by Linus Torvalds https://www.youtube.com/watch?v=4XpnKHJAok8
```

Now, commit the change to master branch.

```bash
$ git commit -am "fixed Git tutorial bullet point"
```

Now merge the `feature3` branch. This will create a merge commit.

```bash
$ git merge feature3
```

View the log graph.

```bash
$ git log --oneline --graph
```

### git merge (conflict)

In this section, we will look at scenario where there is a merge conflict. Merge conflict happens when you're trying to merge a branch that has changed the same part of the same file as master. Let's create a new branch `feature4`, make a change, and commit.

```bash
$ git checkout -b feature4
$ echo "I will create a Github account today." >> README.md
$ git commit -am "eighth commit. Signup for Github."
```

Now, checkout master, make a change, and then commit it.

```bash
$ git checkout master
$ echo "I will create my first repository today." >> README.md
$ git commit -am "eighth commit. Create repository on Github."
```

If you try to merge the `feature4` branch, you will get merge conflict as shown below.

```bash
$ git merge feature4
```
```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

To merge the conflict, open the file in your favorite editor. I like [Atom](https://github.com/atom/atom).

```bash
$ cat README.md
```
```
# Git Playground
This is my Git playground.
I will learn Git today during the XKE.
I will read a Git tutorial https://www.atlassian.com/git/tutorials/.
I will watch a Git video by Linus Torvalds https://www.youtube.com/watch?v=4XpnKHJAok8
I will try Git using tutorial https://try.github.io/
<<<<<<< HEAD
I will create my first repository today.
=======
I will create a Github account today.
>>>>>>> feature4
```

The merged output is shown below.

```
# Git Playground
This is my Git playground.
I will learn Git today during the XKE.
I will read a Git tutorial https://www.atlassian.com/git/tutorials/.
I will watch a Git video by Linus Torvalds https://www.youtube.com/watch?v=4XpnKHJAok8
I will try Git using tutorial https://try.github.io/
I will create a Github account today.
I will create my first repository today.
```

To make the merge resolved, execute `git add` command.

```bash
$ git add README.md
```

Commit it

```bash
$ git commit -am "Resolved merged conflict with feature4 branch"
```


## Working with remote repositories

In Git, every developer has their own local copy of the repository. It has all the repository history and branches. A developer works on their local copy and when done with the work, the changes can be pushed to a remote repository. A local repository can point to 0 or more remote repositories. A remote repository could be on Github or any other cloud VCS provider or even it could be on your own machine.

### git remote

The **git remote** command lets you create, view, and delete connections to other repositories.

To view all the remotes, execute the following command.

```bash
$ git remote
```

As we have not added any remote yet, this command will not print any output.

To add a new remote, execute the following command.

```bash
$ git remote add local ../git-basic-remote.git
```

>	**Please use correct path to your remote repository.**

To push our repository changes to this remote repository we can run the following command. This command will be executed from inside the `git-basic` directory.

```bash
$ git push local master
```
```
Counting objects: 37, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (32/32), done.
Writing objects: 100% (37/37), 3.41 KiB | 0 bytes/s, done.
Total 37 (delta 11), reused 0 (delta 0)
To ../git-basic-remote.git
 * [new branch]      master -> master
```

Now, you can create multiple local copies of the remote repository using `clone` command.

```bash
$ git clone git-basic-remote.git git-basics
```
```
Cloning into 'git-basics'...
done.
```

Change directory and view the contents.

```bash
$ cd git-basic-1
```

You can see history of the repository using `git log --oneline --decorate` command.

Let's make a change in `git-basics` repository.

```bash
$ echo "I will read Git in Practice book" >> README.md
$ git commit -am "ninth commit. Read book."
$ git push local master
```

To get changes in our first repository i.e. `git-basic`, you will use `pull` command.

```bash
$ git pull local master
```

## Github basics

Github is a collaborative code management platform for open source and private projects. It has social features just like any other social website like Facebook, Twitter, etc.

You use Github to store your code on a remote Git repository.

You can [sign up](https://github.com/join) for Github.


### Create a repository

Create a [new repository](https://github.com/new).

Give it name `git-bas` and choose defaults.

### add remote

From inside your `git-basic`, execute the following command.

```bash
$ git remote add origin https://github.com/baalajimaestro/git-basic.git
```

### git push

Push the changes to Github.

### Create pull request

1. Clone your repo on your local machine.
3. Commit and push the changes to your fork
4. Create a pull request


### git rebase

Rebasing is the process of moving a branch to a new base commit. It is used to keep Git history linear so you will not have merge commits.

```bash
$ git checkout -b feature5
$ echo "I will prefer rebase over merge to avoid merge commit." >> README.md
$ git commit -am "tenth commit. Prefer rebase over merge"
```

Work on master branch.

```bash
$ git checkout master
$ echo "I will prefer merge over rebase as it is easy to understand." >> README.md
$ git commit -am "Merge over Rebase"
```

Rebase command

```bash
$ git rebase feature5 master
```

Fix merge conflicts.

```bash
$ git add README.md
$ git rebase --continue
```

Now view the logs using

```bash
$ git log --oneline --decorate --graph
```

Delete the branch

```bash
$ git branch -d feature5
```

### git cherry-pick

Applying a commit from one branch to another

```bash
$ git cherry-pick <commit-hash>
```

### git alias

Allows you write your own commands or shortcuts. Like we have been using `git log --oneline --decorate --graph`.

```bash
$ git config --global alias.mylog "log --oneline --decorate --graph"
```
