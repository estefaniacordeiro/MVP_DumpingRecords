# MYMVP: Exp@

## Installation
* Do `npm install` to load the package node.modules
* Copy the file .env.test to .env
* Modify the variables to connect MySQL and to send emails via Sengrid

## Create more user admin
* Initially only the necessary admin users will be created. In this case, only one. 
* If you want to create more admin users, the file `.gitignore` refers to a file `createUserAdmin.js`, which is used to enter in the database the hashed password and uuid of that admin. 

