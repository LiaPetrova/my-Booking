const { login, register } = require('../services/authService');
const { body, validationResult } = require('express-validator');

const authController = require('express').Router();

authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

authController.post('/login', async (req, res) => {
    try {
        const result = await login(req.body.username.trim(), req.body.password.trim());
        console.log(result);
        attachToken(req, res, result);
        res.redirect('/');
    } catch (err) {
        res.render('login', {
            title: 'Login',
            error: err.message.split('\n')
        }); 
    }
});

authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    });
});

authController.post('/register', 
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required!').bail()
        .isAlphanumeric().withMessage('Username may contain only english letters and numbers'),
    body('password')
        .trim()
        .isLength( { min: 3 } ).withMessage('Password must contain at least 3 characters'),
    body('repass')
        .trim()
        .custom(( value, { req }) => value === req.body.password).withMessage('Passwords don\'t match'),

        async (req, res) => {
        try {

            const { errors } = validationResult(req);
            // console.log(errors);

            if(errors.length > 0) {
                throw errors;
            }
            const result = await register(req.body.username, req.body.password);
            attachToken(req, res, result);
            res.redirect('/');
        } catch (error) {
            const fields = Object.fromEntries(error.map(e => [e.param, e.param]));
            res.render('register', {
                title: 'Register',
                body: {
                    username: req.body.username
                },
                error,
                fields
            });     
        }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/');
});

function attachToken ( req, res, data ) {
    const token = req.signJwt(data);
    res.cookie('jwt', token, { maxAge: 14400000 });
}

module.exports = authController;