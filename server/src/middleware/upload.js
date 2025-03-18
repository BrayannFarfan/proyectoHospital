import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootDir, 'uploads/users'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = `user-${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const medicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootDir, 'uploads/medics'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = `medic-${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  if (!file) {
    cb(null, false);
  } else if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, GIF, and JPG images are allowed'), false);
  }
};

// Middleware para manejar errores de multer
const multerErrorHandler = (multerMiddleware) => {
  return (req, res, next) => {
    multerMiddleware(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err.message); // Depuración
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
};

export const uploadUserProfilePic = multerErrorHandler(
  multer({
    storage: userStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single('profilePic')
);

export const uploadMedicProfilePic = multerErrorHandler(
  multer({
    storage: medicStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single('profilePic')
);