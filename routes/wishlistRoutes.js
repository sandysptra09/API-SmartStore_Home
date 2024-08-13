'use strict'
const express = require('express');
const wishlist = require('../controllers/wishlistController');
const { verifyToken } = require('../middleware/verify');
const router = express.Router()

// Get All Wishlist User
router.get(`/api/smartstore/wishlists`, wishlist.index)

// Add Wishlist
router.post(`/api/smartstore/wishlist`, verifyToken, wishlist.store)

// Get All Wishlist User By Id wishlist
router.get(`/api/smartstore/wishlist/:id`, wishlist.show)

// Update Wishlist User By Id wishlist
router.put(`/api/smartstore/wishlist/:id`, verifyToken, wishlist.update)

// Delete Wishlist User By Id
router.delete(`/api/smartstore/wishlist`, verifyToken, wishlist.destroy)

module.exports = router