# Portfolio deployment pipeline

## 1. Configure the local environment

Open your terminal and navigate to a directory you want the project to be cloned into.

Once you are in that directory: 

```Shell
git clone https://github.com/CJMcClure/caseymcclure2
```

Inside the directory you will find a file titled `ecosystem.config.js.sample`

Rename this file to `ecosystem.config.js`

This file will be used to start our application and is also where you will define your environment variables. The file will look like this: 

```
{
  apps : [
    {
      name      : "cm2",
      script    : "<project-dir>/src/server.js",
      env: {
        DB_USER: <your-db-user>,
        DB_PASSWORD: <your-db-password>,
        DB_DATABASE: <your-db>, 
      },
    },
  ],
}
```
> Note: You will have to create a MySQL database for this project.

* `<project-dir>` is the path to this project on your local machine.
* `<your-db-user>` is the user for this projects database
* `<your-db-password>` is the password for your user
* `<your-db>` is the database you created for this project. 

## 2. Commit changes to Github

This project operates on a feature branch workflow, so for each new feature you want to add to the project, create a new branch:

```Shell
git checkout -b <feature-branch-name>
```

Once you are on the branch, make your changes, and everytime you hit a meaningful stopping point, make a commit:

```Shell
git add <changed-files>

git commit -m "Meaningful commit message"
```

When you finish your feature, you can send it to Github, with a push:

```Shell
git push origin <your-feature-branch>
```
> Note: You will continue to create new feature branches through the project, they will all follow this sequence of steps.

## 3. Create a Pull Request

Go to this projects git repository in a web browser

```Shell
https://github.com/CJMcClure/caseymcclure2
```
Now you create a pull request

1. Click the `Pull Requests` tab in the menu bar.
1. Click the **Green** `New Pull Request` button on the right
1. Set `base:` to `development` and `compare:` to `<your-feature-branch>`
1. Click the **Green** `Create Pull Request` button on the left
1. Create a meaningful title and message.
1. Click the **Green** `Create Pull Request` button under the message body.

Your branch will be reviewed by an administrator, if there are no issues with your code, it will be merged into the project. If there is an issue with your code, your pull request will be denied and you will have to go through these steps again.       


 