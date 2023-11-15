const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel');

// Routes for hotels
router.post('/hotelCreate', hotelController.createHotel); // Create a new hotel
router.get('/hotels', hotelController.getAllHotels); // Get all hotels
router.get('/hotels/:id', hotelController.getHotelById); // Get a specific hotel by ID
router.put('/hotels/:id', hotelController.updateHotel); // Update a hotel by ID
router.delete('/hotels/:id', hotelController.deleteHotel); // Delete a hotel by ID

module.exports = router;
