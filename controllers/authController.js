const jwt = require('jsonwebtoken');
const authController = require('express').Router();

const jwtSecret = 'dkljlk3jlfd3';   

authController.get('/obtain', (req, res) => {
    const payload = {
        _id: '3438388ec84838cc8e876543',
        username: 'Peter',
        roles: ['user']
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '4h'});
    res.cookie('jwt', token);
    res.send('Here is your token ' + token);        
});

authController.get('/validate', (req, res) => {
    const token = req.cookies.jwt;
    if(token) {
        try {
            const data = jwt.verify(token, jwtSecret);
            console.log(data);
            res.json(data);
        } catch (err) {
            res.cookie('jwt', '', { maxAge: 0});
            res.redirect('/login')
        }
    } else {
        res.send('Missing token');
    }
});

module.exports = authController;