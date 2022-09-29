const defaultController = require('../controllers/defaultController');
const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const createController = require('../controllers/createController');

module.exports = (app) => {
    app.use(homeController);
//attach all controllers
app.use('/catalog', catalogController);
app.use('/create', createController);
app.all('*', defaultController);
};  