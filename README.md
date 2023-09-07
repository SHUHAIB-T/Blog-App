# Blog Doc [![Project Built By](https://img.shields.io/badge/Project%20Built%20by-%20shuhaib_t_u-brightgreen.svg)](https://shuhaib-t.github.io/)
<p align="center">
  <img height="400" width="auto" src="https://github.com/SHUHAIB-T/Blog-App/blob/master/public/images/login%20page.png">
</p>

## Overview

This is a Node.js and Express web application that allows users to register, sign in, create their own blogs, and includes an admin section for managing users.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your system.
- MongoDB set up and running.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/SHUHAIB-T/Blog-App.git
   ```
2. Navigate to the project directory:
    ```
    cd Blog-App
    ```
3. Install the required dependencies:

    ```
    npm install
    ```
## USAGE
1. Start the application:

    ```
    npm start
    ```
The app will be accessible at http://localhost:3000

2. Register a new user account or sign in if you have an existing account.

3. Create and manage your blogs from the user dashboard
   <p align="center">
  <img height="400" width="auto" src="https://github.com/SHUHAIB-T/Blog-App/blob/master/public/images/home%20Page.png">
</p>

## Admin Section
To access the admin section:
- Navigate to the admin panel using the provided URL, e.g `https://localhost:3000/admin`
  <p align="center">
  <img height="400" width="auto" src="https://github.com/SHUHAIB-T/Blog-App/blob/master/public/images/admin_login.png">
</p>

- before getting into the admin section you should create admin email and password
### Go to your command prompt / cmd
- go to mongosh 
 
```
mongosh
```
or
```
mongo
```
- enter
  -
    ```
    use userDB
    ```
- Create username and password for Admin
- eg:
    ```
    db.userDB.insertOne({email:"admin@gmail.com",password:"admin@123"})
    ```
- In the admin panel, you can: <br>
  - View a list of users.
  - Add new users.
  - Delete users, Edit users
  - Search for users using the search functionality.
 <p align="center">
  <img height="400" width="auto" src="https://github.com/SHUHAIB-T/Blog-App/blob/master/public/images/admin%20landing%20page.png">
</p>
  
  # Contributing
 	Feel free to contribute to this project. You can submit issues or pull requests.
