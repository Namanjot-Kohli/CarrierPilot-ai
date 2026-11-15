const multer = require('multer');

// Store file in memory buffer so we can parse it directly without persisting temporary disk files
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ];

  const ext = file.originalname.toLowerCase();
  const isAllowedExt = ext.endsWith('.pdf') || ext.endsWith('.docx') || ext.endsWith('.doc');

  if (allowedMimes.includes(file.mimetype) || isAllowedExt) {
    cb(null, true);
  } else {
    const error = new Error('Invalid file type. Only PDF and DOCX documents are supported.');
    error.statusCode = 400;
    cb(error, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB max
  },
  fileFilter
});

module.exports = upload;
