'use strict'
const express = require('express');
const router = express();

// initiate routes user
const user = require('./userRoutes');

// initiate routes auth
const auth = require('./authRoutes');

// initiate routes product
const product = require('./productRoutes')

// initiate routes brand
const brand = require('./brandRoutes')

// initiate routes category
const category = require('./categoryRoutes');

// initiate routes cart
const cart = require('./cartRoutes');

// initiate routes wishlist
const wishlist = require('./wishlistRoutes');



router.get(`/api/smartstore/`, (_req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: "Welcome to SmartStore Home"
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
})

// routes user
router.use(user);

// routes auth
router.use(auth);

// routes product
router.use(product);

// routes brand
router.use(brand);

// routes category
router.use(category);

// routes cart
router.use(cart);

// routes wishlist
router.use(wishlist);

module.exports = router