const { model, Schema, Types: { ObjectId } } = require('mongoose');

const facilitySchema = new Schema({
    label: { type: String, required: true},
    iconUrl: { type: String, minLength: 1},
    rooms: { type: [ObjectId], default: [], ref: 'Room' }
});

const Facility = model('Facility', facilitySchema);

module.exports = Facility;