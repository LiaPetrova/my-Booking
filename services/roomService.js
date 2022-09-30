const Room = require('../models/Room');

function getAll() {
    return Room.find({}).lean();
}

function getById (id) {
    return Room.findById(id).populate('facilities', 'label iconUrl').lean();
    // Room.find({_id: id});
}

async function create (roomData) {
    const room = {
        name: roomData.name,
        description: roomData.description,
        city: roomData.city,
        beds: Number(roomData.beds),
        price: Number(roomData.price),
        imageUrl: roomData.imageUrl
    }

    const missing = Object.entries(room).filter(([k, v]) => !v);
    if(missing.length > 0) {
        throw new Error(missing.map(m => {
            const field = m[0][0].toUpperCase() + m[0].slice(1);
           return  `${field} is required!`})
            .join('\n'));
    }

    const result = await Room.create(room);
    return result;
}


module.exports = {
    getAll,
    getById,
    create
};