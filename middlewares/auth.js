const jwt = require('jsonwebtoken');

module.exports = (jwtSecret) => (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        try {
            const data = jwt.verify(token, jwtSecret);
            console.log(data);
            req.user = data;
        } catch (err) {
            res.cookie('jwt', '', { maxAge: 0});
            return res.redirect('/login');
        }
    }
    next();
};