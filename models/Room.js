const { model, Schema, Types } = require('mongoose');

const URL_REGEX = /^(https?:\/)?\/.*/i;

const roomSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    beds: { type: Number, required: true, min: [1, 'Must supply at least one bed'] },
    price: { type: Number, required: true, min: [0.01, 'Price must be a positive number'] },
    imageUrl: { type: String, validate: {
        validator: (value) => URL_REGEX.test(value),
        message: (props) => {
             return `${props.value} is not a valid image Url`;
            }
        } 
    },
    facilities: { type: [Types.ObjectId], default: [], ref: 'Facility' },
    owner: { type: Types.ObjectId, ref: 'user', required: true }
});

const Room = new model('Room', roomSchema);

module.exports = Room;