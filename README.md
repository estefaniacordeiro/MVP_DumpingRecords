# MYMVP: Exp@

## Installation
* Do `npm install` to load the package node.modules
* Copy the file .env.test to .env
* Modify the variables to connect MySQL and to send emails via Sengrid

## Create more user admin
* In this web application there are two types of users: 
*   ADMIN creates and modifies the dumping records and manages the status of them.
*   COMPANY can only consult its record.
* Initially only the necessary admin users will be created. In this case, only one. 
* If you want to create more admin users, the file `.gitignore` refers to a file `createUserAdmin.js`, which is used to enter in the database the hashed password and uuid of that admin. 

## Flow of the web application
* ENDPOINTS:
* - /api/login-admin -> 
* - /api/search-record ->
* - /api/new-record ->
* - /api/login ->
* - /api/record ->

