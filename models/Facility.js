const { model, Schema, Types: { ObjectId } } = require('mongoose');

const facilitySchema = new Schema({
    label: { type: String, required: true},
    iconUrl: { type: String, minLength: [3, 'Icon URL must be at least 3 characters long'] },
    rooms: { type: [ObjectId], default: [], ref: 'Room' }
});

const Facility = model('Facility', facilitySchema);

module.exports = Facility;