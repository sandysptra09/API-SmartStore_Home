const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const fileUpload = require('express-fileupload')
require("dotenv").config()

app.use(cors());
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
// }));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended:
        false
}))
app.use(bodyParser.json())

const server = app.listen(process.env.APP_PORT, () => console.log(`Server is running on port ${process.env.APP_PORT}`))

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
        process.exit(0);
    });
});