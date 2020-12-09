const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    fileFilter: (req, file, cb) => {
        console.log('foo');
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error(
                `Only .png, .jpg and
                     .jpeg format allowed!`
            ));
        }
    }
});

module.exports = upload;