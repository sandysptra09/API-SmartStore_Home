'use strict'
const express = require('express')
const auth = require('../controllers/authController')
const { check, validationResult } = require('express-validator')
const passwordHash = require('password-hash')
const router = express.Router()

const checkValidation = [
    // isAlphanumeric adalah fungsi mengecek inputan kita harus angka atau huruf
    // isemail mengeck email
    check('username').not().isEmpty().withMessage('required value').isAlphanumeric(),
    // check('fullname').isAlpha().isLength({ min: 5, max: 50 }),
    check('email').not().isEmpty().withMessage('required value').isEmail(),
    check('password').not().isEmpty().withMessage('required value').isAlphanumeric(),
    // check('role_name').not().isEmpty().withMessage('required value').isAlphanumeric()

];

const checkValidationLogin = [
    // isAlphanumeric adalah fungsi mengecek inputan kita harus angka atau huruf
    check('username').not().isEmpty().withMessage('required value').isAlphanumeric(),
    check('password').not().isEmpty().withMessage('required value').isAlphanumeric()
];

const postParam = (req) => {
    // hash password dengan library password hash
    const passwordToSave = passwordHash.generate(req.body.password),
        data = {
            username: req.body.username.trim(),
            // fullname: req.body.fullname.trim(),
            email: req.body.email,
            password: passwordToSave,
            // role_name: req.body.role_name
        };
    return data;
}

router.get(`/api/smartstore/auth/`, (_req, res) => {
    res.json({
        "message": "Welcome to the SmartStore authentication API. Explore the available endpoints to manage user registration, login, and logout.",
        "documentation": "For detailed API documentation, please refer to the SmartStore API documentation.",
        "contact_support": "If you have any questions or need assistance, feel free to contact our support team.",
        "author": "API developed by SmartStore Home."
    });
});

// Register Account
router.post(`/api/smartstore/auth/register`, [checkValidation], (req, res) => {
    // mengecek ke middleware apakah kondisi validasi terpenuhi atau tidak
    const errors = validationResult(req);

    // jika error kirim pesan error jikat tidak lanjut ke simpan data
    (!errors.isEmpty() ? res.status(422).json(errors) : auth.register(postParam(req), res))
})

// Login Account
router.post(`/api/smartstore/auth/login`, [checkValidationLogin], (req, res) => {
    // mengecek ke middleware apakah kondisi validasi terpenuhi atau tidak
    const errors = validationResult(req);

    // jika error kirim pesan error jikat tidak lanjut ke simpan data
    (!errors.isEmpty() ? res.status(422).json(errors) : auth.authentication(req, res))
})

// Logout of Account
router.post(`/api/smartstore/auth/logout`, auth.logout)

module.exports = router