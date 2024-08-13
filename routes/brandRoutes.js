'use strict'
const express = require('express');
const brand = require('../controllers/brandController');
const { verifyToken } = require('../middleware/verify');
const router = express.Router()

// Get All Brands
router.get(`/api/smartstore/brands`, brand.index)

// Add or Create Brands
router.post(`/api/smartstore/brand`, verifyToken, brand.store)

// Get Brand By Id
router.get(`/api/smartstore/brand/:id`, brand.show)

// Get Brand By Slug
router.get(`/api/smartstore/brand-by-slug/:slug`, brand.showBrandBySlug)

// Update Brand By Id
router.put(`/api/smartstore/brand/:id`, verifyToken, brand.update)

// Delete Brand By Id
router.delete(`/api/smartstore/brand/:id`, verifyToken, brand.destroy)

module.exports = router