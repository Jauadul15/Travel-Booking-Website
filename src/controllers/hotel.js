const Hotel = require('../models/hotelSchema');
require("dotenv").config();

const hotelController = {
    // Create a new hotel with manual validation
    createHotel: async (req, res) => {
        try {
            const { location_id, name, room_rent, thumbnail, status } = req.body;

            // Check for required fields
            if (!location_id || !name || !room_rent || !thumbnail || !status) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            // Validate field types
            if (typeof name !== 'string' || typeof thumbnail !== 'string' || typeof status !== 'string') {
                return res.status(400).json({ message: 'Invalid field type for name, thumbnail, or status.' });
            }

            if (typeof room_rent !== 'number' || isNaN(room_rent)) {
                return res.status(400).json({ message: 'Room rent should be a valid number.' });
            }

            // Additional validation for specific fields can be added here

            // Create a new hotel if validation passes
            const newHotel = await Hotel.create(req.body);
            res.json(newHotel);
        } catch (err) {
            // Handle errors if any occur during the process
            res.status(500).json({ message: err.message });
        }
    },
    getAllHotels: async (req, res) => {
        try {
            // Example: Validate query parameters (e.g., filtering by location_id)
            const { location_id } = req.query;
            const query = {};

            if (location_id) {
                query.location_id = location_id; // Include location_id in the query if provided
            }

            const hotels = await Hotel.find(query).populate('reviews').populate('location_id');
            res.json(hotels);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getHotelById: async (req, res) => {
        try {
            const hotel = await Hotel.findById(req.params.id).populate('reviews').populate('location_id'); // Populate references
            res.json(hotel);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateHotel: async (req, res) => {
        try {
            const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedHotel);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteHotel: async (req, res) => {
        try {
            const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
            res.json(deletedHotel);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // Other controller methods will implement later if needed...
};

module.exports = hotelController;
