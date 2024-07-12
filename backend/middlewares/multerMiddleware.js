const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../storage', 'uploads')); // Uploads directory
  },
  filename: function (req, file, cb) {
    const name = req.body.file_name ? req.body.file_name  : file.originalname;
    cb(null, name + path.extname(file.originalname));
  }
});

function fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(csv|xlsx)$/)) {
    return cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
  }
  cb(null, true);
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10 
  }
});

module.exports = { upload };
