Projet 7-Groupomania - Création d'une application fullstack


** Installation **

DATABASE SETUP

1. Start your MySQL server
2. Create a database "groupomaniaDB"
3. Import tables from added sql file


4. Create a .env file in the backend root, copy paste the following and change DB_USER and DB_PASS with your infos:
```
DB_HOST=localhost
DB_USERNAME=your_database_user
DB_PASSWORD=your_user_password
DB_DATABASE=groupomaniaDB
TOKEN_SECRET_KEY=your_secret_key
```


BACK-END SETUP  

go to back folder
```
cd back
```

then install all necessary dependencies

```
npm install
```

and run a server

```
npm start
```



FRONT-END SETUP

1. Create a .env file in the frontend root, copy paste the following and change REACT_APP_API_ROOT infos with a root of your server:
```
REACT_APP_API_ROOT=http://localhost:3001
```


2. Go to front folder

```
cd front
```

3. Then install all necessary dependencies

```
npm install
```

4. And run a server 

```
npm start
```


To access admin user, enter the following infos on the connection page :

```
Email:
admin@gmail.com
Password:
Admin_2022
```
