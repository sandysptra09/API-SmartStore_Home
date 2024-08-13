'use strict'
const express = require('express');
const cart = require('../controllers/cartController');
const { verifyToken } = require('../middleware/verify');
const router = express.Router()

// // Get All Carts User 
router.get(`/api/smartstore/carts`, cart.index)

// Add Cart
router.post(`/api/smartstore/cart`, verifyToken, cart.store)

// Get All Cart User By Id cart
router.get(`/api/smartstore/cart/:id`, cart.show)

// Update Cart User By Id cart
router.put(`/api/smartstore/cart/:id`, verifyToken, cart.update)

// Delete Cart User By Id
router.delete(`/api/smartstore/cart`, verifyToken, cart.destroy)

module.exports = router