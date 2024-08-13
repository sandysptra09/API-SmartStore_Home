require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require("../database/models")
const Blacklist = db.Blacklist;
const Users = db.Users
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyToken = async (req, res, next) => {
    // cek jika header ada param authorization standar bearer
    if (req.headers.authorization) {
        // mengambil Bearer token dari header
        const token = req.headers.authorization.split(' ')[1]

        console.log('token' + token);

        /* 
        proses pengecekan token apakah token yang dikirim itu masuk daftar
        blacklist atau tidak ???
        */
        const checkBlackList = await Blacklist.findOne({ where: { token } });
        if (checkBlackList) {
            return res.status(401).send({
                auth: false,
                message: 'Your token is blacklist, please login again'
            })
        }

        /* 
            proses verifikasi token dengan secret key yang kita buat
        */
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: err })
            }

            req.userToken = decoded.userToken;

            // Check if the URL contains 'me' and replace it with the actual user ID
            if (req.url.includes('me')) {
                // Find the user based on the decodedd user ID
                const user = await Users.findByPk(decoded.userToken.id);

                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }

                // Assign the user information to req.user
                req.user = {
                    id: user.id,
                    username: user.username,
                    // Add other user information as needed
                };

                // Replace 'me' with the actual user ID
                req.url = req.url.replace('me', decoded.userToken.id.toString());
            }

            next()
        })
    } else {
        res.status(401).send({
            auth: false,
            message: 'Token required'
        })
    }
}

const adminOnly = async (req, res, next) => {
    try {
        // chech if role admin
        if (req.userToken.role_name !== 'admin') {
            return res.status(403).json({ message: "Access Denied !" });
        }
        next()
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token not valid" });
    }
}

module.exports = { verifyToken, adminOnly }