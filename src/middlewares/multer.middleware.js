const multer = require("multer")

//Here used disk storage go to npm multer and copy the code
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images") //changed the directory by user
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

module.exports = multer({ storage: storage })