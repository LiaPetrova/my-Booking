const { model, Schema, Types } = require('mongoose');

const URL_REGEX = /^(https?:\/)?\/.*/i;

const roomSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    beds: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0.01 },
    imageUrl: { type: String, validate: {
        validator: (value) => URL_REGEX.test(value),
        message: (props) => {
             return `${props.value} is not a valid imgage Url`;
            }
        } 
    },
    facilities: { type: [Types.ObjectId], default: [], ref: 'Facility' },
    owner: { type: Types.ObjectId, ref: 'user', required: true }
});

const Room = new model('Room', roomSchema);

module.exports = Room;