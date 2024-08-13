const db = require("../database/models")
const Users = db.Users
const Blacklist = db.Blacklist
const jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')
require("dotenv").config()

const register = async (input, res) => {
    try {
        /* input mengambil dari route hasil validasi 
           jadi di controller sudah bersih tidak ada logic pengecekan lagi
        */
        const save = await Users.create(input)
        res.json(save).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 */
const authentication = async (req, res) => {
    try {
        const username = req.body.username.trim();
        const password = req.body.password.trim();

        // cek jika username atau password kosong
        if (!username || !password) {
            return res.status(422).json({ message: 'Username or password cannot be empty' });
        }

        const cekUsername = await Users.findOne({ where: { username: username } });

        // cek apakah username tidak ditemukan
        if (!cekUsername) {
            return res.status(422).json({ message: 'Username not found' });
        }

        const fetchResult = cekUsername.dataValues
        const verify = passwordHash.verify(password, fetchResult.password);

        /*  cek apakah password yanng di input sama dengan yang ada didatabase
            lalu di cocokan menggunakan hash
        */
        if (verify !== true) {
            res.json({ message: 'Password incorect !' }).status(422)
        } else {

            // isi value token kita mau apa aja
            const userToken = {
                id: fetchResult.id,
                username: fetchResult.username,
                role_name: fetchResult.role_name
            }

            /*  set token dengan value usertoken
                set secret key token kita untuk nanti validasi
                set expires token nya
                lalu kasih balikan berupa token jika login sukses
            */
            jwt.sign({ userToken }, process.env.JWT_KEY, {
                expiresIn: '8d' //set exipre token
            }, (err, token) => {
                res.json({
                    message: 'Login sucessfully',
                    token: token,
                    user: fetchResult
                }).status(200)
            });
        }
    } catch (error) {
        // kondisi jika username atau password salah
        res.json({ message: `username or password not match ${error}` }).status(422);
    }
}

const logout = async (req, res) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            await Blacklist.create({ token: token })
            res.json({ message: 'Logout sucessfully' }).status(200);
        } else {
            res.json({ message: 'Token required' }).status(422);
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: error }).status(422);
    }
}

const getLoggedInUserData = async (req, res) => {
    try {
        // Access the user ID from the token
        const userId = req.userToken.id;

        const data = await Users.findByPk(userId, {
            attributes: ['id', 'username', 'firstname', 'lastname', 'phone', 'address1', 'province', 'city', 'post_code', 'email', 'role_name']
        });

        if (!data) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(data).status(200);
    } catch (error) {
        res.json(error).status(422);
    }
};

module.exports = {
    register, authentication, logout, getLoggedInUserData
}