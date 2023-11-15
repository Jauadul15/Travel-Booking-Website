const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hotelSchema = new Schema({
    location_id: { type: Schema.Types.ObjectId, ref: 'Location' },
    name: String,
    room_rent: Number,
    thumbnail: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    ratings: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    status: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
