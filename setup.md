# Server Setup

## Create Droplets (Servers)

### Droplet SSH key

Create a generic SSH key to use during initial configuration, by typing the following command into your terminal:

```Shell
ssh-keygen -t rsa -b 4096
```

> Note: You will be prompted through the process, name it something unique, but easily memorable.

### Sign Up

Setup an account at [Digital Ocean](https://www.digitalocean.com)

> Once you are logged in, complete the following steps from your dashboard.

### Initialize

#### Staging Server

Click the `Create Droplet` button.

Select `Ubuntu 16.04.2x64`

Select `$5/mth` size package

Select a `New York` data center

Add the SSH key you created earlier

Select to use your SSH key

Name Droplet `staging`

Click `Create`

> Note: Copy the ip address somewhere readily available, we'll use it within the next few steps

#### Production Server

Click the `Create Droplet` button.

Select `Ubuntu 16.04.2x64`

Select `$5/mth` size package

Select a `New York` data center

Select to use your SSH key

Name Droplet `production`

Click `Create`

> Note: Copy the ip address somewhere readily available, we'll use it within the next few steps

#### Jenkins Server

Click the `Create Droplet` button.

Select `Ubuntu 16.04.2x64`

Select `$5/mth` size package

Select a `New York` data center

Select to use your SSH key

Name Droplet `jenkins`

Click `Create`

> Note: Copy the ip address somewhere readily available, we'll use it within the next few steps

## Install Ansible

### Homebrew First

From your terminal, enter the following command:

```Shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)
```
### Ansible Second

From your terminal, enter the following command:

```Shell
brew install ansible
```
> Note: Once you've installed these two tools, you're ready to move on to the next steps.

## Clone git repo

See step #1 of the [README.md](./README.md) file.

## Run Ansible Playbooks

In terminal change directories to the cloned projects, ansible directory:

```Shell
cd /Path/to/caseymcclure2/ansible
```
### Add staging and production ip's to ansible-playbook

Open the `hosts` file in your favorite text editor

It will look like this:

```
[staging]
#Your staging ip goes here

[production]
#Your production ip goes here
```

Replace the ip address under `[staging]` with your new staging server ip

Replace the ip address under `[production]` with your new production server ip

> Note: Save the hosts file before continuing

Now we need to update the files in the group_vars directory

Both the staging.yml and production.yml files will look like this:

```yaml
---
system:
  ip: <ip-here>
  user: #Your user goes here
```

In the `staging.yml` file, replace the existing ip, with the new staging server ip.

In the `production.yml` file, replace the existing ip, with the new production server ip.

> Note: Ensure you save each file after adding the new ip address

Complete the same steps for the `Dwa_Api` directory

###Define variables

First we need to be in the right directory:

```Shell
cd /Path/to/caseymcclure2/ansible/roles
```
Each `role` in this folder has a `var` folder with a `main.yml` file

Open each of the following files and define the variables inside

* caseymcclure2/ansible/caseymcclure2/vars/main.yml
* caseymcclure2/ansible/db/vars/main.yml
* caseymcclure2/ansible/lem/vars/main.yml
* caseymcclure2/ansible/users/vars/main.yml

### Run Ansible

Make sure you are in the ansible directory of your project:

```Shell
cd /Path/to/caseymcclure2/ansible
```

First we need to install python2 on each of our servers, by running the following commands in terminal

First:

```Shell
ansible staging -m raw -s -a "sudo apt-get -y install python-simplejson" -u root --private-key=~/.ssh/<ssh-key> -i ./hosts
```

Second:

```Shell
ansible production -m raw -s -a "sudo apt-get -y install python-simplejson" -u root --private-key=~/.ssh/<ssh-key> -i ./hosts
```

Now python2 is installed and we can run our ansible playbook with the following commands:

```Shell 
ansible-playbook server.yml -i ./hosts --private-key ~/.ssh/<ssh-key> 

ansible-playbook project.yml -i ./hosts --private-key ~/.ssh/<ssh-key> 
```
> Note: `server.yml` configures servers specific requirements `project.yml` configures project specific requirements. It is neccessary to execute them in the order presented.

## Configure Jenkins

Jenkins requires verification of ownership, if you navigate to your Jenkins interface in a browser you will be prompted: 

```Shell
http://<jenkins-server-ip>:8080
```
You will be given a file path to an authorization code within your Jenkins server, so you'll have to ssh into your jenkins server and copy the code from the file:

```Shell
ssh -i ~/.ssh/<ssh-key> root@<jenkins-server-ip>
```

* `<ssh-key>` is the key you created and added to digital ocean
* `<jenkins-server-ip>` is the ip address of your jenkins server

Now access the file path provided by Jenkins, copy the contents and paste them into the prompt box in the Jenkins browser interface. 

You will be prompted through a few sign-up steps, follow them and remember the password you choose.

Follow these steps to create a new job:

> Note: You will complete this process **2** times, once for the staging server and once for the production server.

1. Select `New Item` from the left menu bar
1. Name your job `e.g. Staging_projectName`
1. Select `Freestyle Project`
1. Scroll to the bottom and click `OK`

There are **3** sections we are concerned with configuring


##### Source code management

1. Repository URL is `https://github.com/CJMcClure/caseymcclure2`
1. Credentials are the username and password of the github user with 
access to the project's directory
1. For Staging, the branch is `*/prerelease`
1. For Production, the branch is `*/master` 

##### Build Triggers

1. Check the `GitHub hook trigger for GITScm polling` box

##### Build

1. Click `Add build step`
1. Select `Execute Shell`
1. Add this script:

```Shell
scp -r -i /var/lib/jenkins/.ssh/id_rsa $WORKSPACE/* <deploy-user>@<server-ip>:/var/www/caseymcclure2/

ssh <app-user>@<server-ip> <<EOF
cd /var/ecosystems
/usr/local/lib/npm/bin/pm2 start caseymcclure2.js
exit
EOF
``` 

* `<deploy-user>` is configured in the [README.md](./README.md) process
* `<app-user>` is configured in the [README.md](./README.md) process
* `<server-ip>` will be your staging ip for the first job
* `<server-ip` will be your production ip for the second job  

Click `Apply` and `Save`

Your servers are now configured for use.

