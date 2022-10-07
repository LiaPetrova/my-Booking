const jwt = require('jsonwebtoken');

async function login(username, password) {
    return new Promise ((res, rej) => {
        if(username.toLowerCase() == 'peter' && password == '123456') {
            res({
                _id: 'ec546542b5343be',
                username: 'Peter',
                roles: ['user']
            });
        } else {
            rej(new Error('Incorrect username or password'));
        }
    });
}

module.exports = {
    login
};