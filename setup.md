# Server Setup

## Create Droplets (Servers)

### Sign Up

Setup an account at [Digital Ocean](https://www.digitalocean.com)

> Once you are logged in, complete the following steps from your dashboard.

### Initialize

#### Staging Server

Click the `Create Droplet` button.

Select `Ubuntu 16.04.2x64`

Select `$5/mth` size package

Select a `New York` data center

Name Droplet `staging`

Click `Create`

> Note: Copy the ip address somewhere readily available, we'll use it within the next few steps

#### Production Server

Click the `Create Droplet` button.

Select `Ubuntu 16.04.2x64`

Select `$5/mth` size package

Select a `New York` data center

Name Droplet `production`

Click `Create`

> Note: Copy the ip address somewhere readily available, we'll use it within the next few steps

#### Jenkins Server

Click the `Create Droplet` button.

Select `Ubuntu 16.04.2x64`

Select `$5/mth` size package

Select a `New York` data center

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
ansible-playbook setup.yml -i ./hosts --private-key ~/.ssh/<ssh-key> 
```

Your servers are now configured for use.