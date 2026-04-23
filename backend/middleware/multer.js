const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/uploads')
    },
    filename: function (req, file, cb) {
        const num = Math.floor(Math.random() * 100000 + 10000)

        const ext = path.extname(file.originalname)

        let filename = "Aman" + Date.now() + num + ext;

        cb(null, filename)
    }
})

const upload = multer({ storage: storage });

module.exports = upload;