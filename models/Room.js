const { model, Schema, Types } = require('mongoose');

const roomSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    beds: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0.01 },
    imgUrl: { type: String },
    facilities: { type: [Types.ObjectId], default: [], ref: 'Facility' },
    owner: { type: Types.ObjectId, ref: 'user', required: true }
});

const Room = new model('Room', roomSchema);

module.exports = Room;