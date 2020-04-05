# Empire Game

## Starting App

With Nodemon
```
npm install
node_modules/.bin/sequelize db:migrate (if you need migrations)
./node_modules/nodemon/bin/nodemon.js index.js
```

To Deploy
```
git push heroku master
heroku open
```