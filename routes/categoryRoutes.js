'use strict'
const express = require('express');
const category = require('../controllers/categoryController');
const { verifyToken } = require('../middleware/verify');
const router = express.Router()

// Get All Categories
router.get(`/api/smartstore/categories`, category.index)

// Add or Create Category
router.post(`/api/smartstore/category`, verifyToken, category.store)

// Get  Category By Id
router.get(`/api/smartstore/category/:id`, category.show)

// Get Category By Slug
router.get(`/api/smartstore/category-by-slug/:slug`, category.showCategoryBySlug)

// Update Category By Id
router.put(`/api/smartstore/category/:id`, verifyToken, category.update)

// Delete Category By Id
router.delete(`/api/smartstore/category/:id`, verifyToken, category.destroy)

module.exports = router