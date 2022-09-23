const { create } = require('../services/accomodationService');

const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('create', {
        title: 'Host new Accomodation'
    });
});

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        res.redirect('/catalog/' + result.id);
    } catch (err) {
        res.render('/create', {
            title: 'Request Error'
        });
    }
});

module.exports = router;
