'use strict'
const express = require('express');
const product = require('../controllers/productController');
const { verifyToken, adminOnly } = require('../middleware/verify');
const router = express.Router()

// Get All Products
router.get(`/api/smartstore/products`, product.index)

// Add Product
router.post(`/api/smartstore/product`, verifyToken, adminOnly, product.store)

// Get Product By Id
router.get(`/api/smartstore/product/:id`, product.show)

// Get Product By Slug
router.get(`/api/smartstore/product-by-slug/:slug`, product.showBySlug)

// Search All Product
router.get(`/api/smartstore/product-search`, product.search)

// Get All Product By Brand
router.get(`/api/smartstore/products-by-brand/:brandName`, product.getByBrand)

// Get All Product By Category
router.get(`/api/smartstore/products-by-category/:categoryName`, product.getByCategory)

// Edit Product By Id
router.put(`/api/smartstore/product/:id`, verifyToken, adminOnly, product.update)

// Edit Product By Slug
router.put(`/api/smartstore/product-by-slug/:slug`, verifyToken, adminOnly, product.updateBySlug)

// Delete Product By Id
router.delete(`/api/smartstore/product/:id`, verifyToken, adminOnly, product.destroy)

module.exports = router 