
var express = require('express');
const registerUser = require('../src/controllers/user.controller');
var router = express.Router();
const upload = require('../src/middlewares/multer.middleware')

router.route("/register").post(  //It was written like before: router.route('/register).post(registerUser) i.e controllers.js
    upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
    ]),
    registerUser)

module.exports = router;
