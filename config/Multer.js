import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Menentukan folder penyimpanan
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Menentukan nama file berdasarkan timestamp
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000 }, // Maksimum ukuran file dalam bytes (1MB)
    fileFilter: function (req, file, cb) {
      const fileTypes = /jpeg|jpg|png|gif|mp4|mov/; // Tipe file yang diperbolehkan
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
  
      if (extName && mimeType) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    }
  });
  
  export default upload;