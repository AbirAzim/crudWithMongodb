const express = require('express');
const bodyParser = require('body-parser'); //for rendering req.body
const path = require('path');

const router = require('./routes/admin'); //importing admin.js file
const homePage = require('./routes/shop'); //importing shop.js file
const errorPage = require('./controllers/error');

const mongoConnect = require('./util/db').mongoConnect;
const User = require('./models/user');



const app = express();


app.set('view engine', 'ejs'); // to set ejs as view engine
app.set('views', 'views'); //to set ejs as view engine


app.use(bodyParser.urlencoded({ // for rendering req.body
    extended: false
}));



app.use(express.static(path.join(__dirname, 'public'))); //for stylesheet 

app.use((req, res, next) => {
    User.findUserById('5e5671033f9a52776018224a')
        .then(user => {
            req.user = new User(user.name, user.gmail, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', router);
app.use(homePage);


app.use(errorPage.errorController)

mongoConnect(() => {
    User.getAllUsers()
        .then(users => {
            if (users.length === 0) {
                user = new User('Bk', 'badhonkhanbk007@gmail.com');
                user.save();
            } else {
                User.findUserById('5e5671033f9a52776018224a')
                    .then(user => {
                        console.log('user found!');
                        console.log(user);
                    })
            }
        })
        .catch(err => console.log(err));

    app.listen(3000);
})