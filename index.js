const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

const defaultController = require('./controllers/defaultController');
const homeController = require('./controllers/homeController');
const catalogController = require('./controllers/catalogController');
const createController = require('./controllers/createController');
const defaultTitle = require('./middlewares/defaultTitle');



const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(defaultTitle('Softuni Accomodation'));

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));

app.use(homeController);
//attach all controllers
app.use('/catalog', catalogController);
app.use('/create', createController);
app.all('*', defaultController);

app.listen(3000, () => console.log('Server listening on Port 3000'));
