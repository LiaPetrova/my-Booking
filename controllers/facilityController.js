const facilityController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { hasRole } = require('../middlewares/guards');
const { createFacility, getAllFacilities, addFacilities } = require('../services/facilityService');
const { getById } = require('../services/roomService');

facilityController.get('/create', hasRole('admin'), (req, res) => {
    res.render('createFacility', {
        title: 'Create New Facility'
    });
});

facilityController.post('/create', hasRole('admin'),
    body('label')
        .trim()
        .notEmpty().withMessage('Label is required'),
    body('iconUrl').trim(),
    async (req, res) => {

        const { errors } = validationResult(req);

    try {
        
        if(errors.length > 0) {
            throw errors;
        }
        await createFacility(req.body.label, req.body.iconUrl);
        res.redirect('/catalog');
    } catch (error) {
        res.render('createFacility', {
            //TODO render errors
            title: 'Create New Facility'
        });
    }
});

facilityController.get('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);

    if( !req.user || req.user._id != room.owner) {
        return res.redirect('/auth/login');
    }

    const facilities = await getAllFacilities();
    facilities.forEach(f => {
        if((room.facilities || []).some(id => id._id.toString() == f._id.toString())) {
            f.checked = true;
        } 
    });

    res.render('decorate', {
        title: 'Add Facility',
        room,
        facilities
    });
});

facilityController.post('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);

    if( !req.user || req.user._id != room.owner) {
        return res.redirect('/auth/login');
    }

   await addFacilities(req.params.roomId, Object.keys(req.body));

    res.redirect('/catalog/' + req.params.roomId);
});

module.exports = facilityController;