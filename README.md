# client

## Project setup
```
1. npm install
```
2. create folder named config on the root directory
```
3. inside the config folder, create a file named config.json
```
4. copy paste the code down below to file config.json
{
  "development": {
    "username": "your database username",
    "password": "your database password",
    "database": "arkapedia",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "your database username",
    "password": "your database password",
    "database": "arkapedia",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "your database username",
    "password": "your database password",
    "database": "arkapedia",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
5. open your database and create new database called "arkapedia"
```
6. run npx sequelize-cli db:migrate
```
7. create file .env on your root directory
```
8. copy paste this code to file .env
PORT = 5000
SECRET_KEY = 'Bismillah'

EMAIL = 'your email' (this email to send activate user to your account)
PASS = 'your password'
```

### Compiles and hot-reloads for development
```
npm start
```