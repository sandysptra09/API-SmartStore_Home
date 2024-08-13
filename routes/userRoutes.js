'use strict'
const express = require('express')

// get by user has token
const user = require("../controllers/userController")

const auth = require("../controllers/authController")
const { verifyToken } = require('../middleware/verify')
const router = express.Router()

router.get(`/api/smartstore/users`, user.index)

// Add or Create Users
router.post(`/api/smartstore/user`, verifyToken, user.store)

// get detail user by token
router.get(`/api/smartstore/user/me`, verifyToken, auth.getLoggedInUserData);

// Get User By Id
router.get(`/api/smartstore/user/:id`, user.show)

// Update User By Id
router.put(`/api/smartstore/user/:id`, verifyToken, user.update)

// Delete User By Id
router.delete(`/api/smartstore/user/:id`, verifyToken, user.destroy)

module.exports = router