
var express = require('express');
const registerUser = require('../src/controllers/user.controller');
var router = express.Router();

router.route("/register").post(registerUser)

module.exports = router;
