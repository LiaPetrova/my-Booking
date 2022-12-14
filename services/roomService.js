const Room = require('../models/Room');

function getAll() {
    return Room.find({}).lean();
}

function getById (id) {
    return Room.findById(id).populate('facilities', 'label iconUrl').lean();
    // Room.find({_id: id});
}

async function create (roomData, ownerId) {
    const room = {
        name: roomData.name,
        description: roomData.description,
        city: roomData.city,
        beds: Number(roomData.beds),
        price: Number(roomData.price),
        imageUrl: roomData.imageUrl,
        owner: ownerId
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

async function update(roomId, roomData) {
    const room = await Room.findById(roomId);

    const missing = Object.entries(roomData).filter(([k, v]) => !v);
    if(missing.length > 0) {
        throw new Error(missing.map(m => {
            const field = m[0][0].toUpperCase() + m[0].slice(1);
           return  `${field} is required!`})
            .join('\n'));
    }

    room.name = roomData.name;
    room.description = roomData.description;
    room.city = roomData.city;
    room.beds = Number(roomData.beds);
    room.price = Number(roomData.price);
    room.imgUrl = roomData.imgUrl;


    await room.save();

    return room;
} 

async function deleteById (roomId) {
    return Room.findByIdAndRemove(roomId);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};