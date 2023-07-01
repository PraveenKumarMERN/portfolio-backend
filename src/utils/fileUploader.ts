import multer from "multer";

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req: any, file: { fieldname: string; originalname: any; }, cb: (arg0: null, arg1: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + getFileExtension(file.originalname));
  }
});

const getFileExtension = (filename: string) => {
  const parts = filename.split('.');
  return parts[parts.length - 1];
};

const upload = multer({ storage });

export default upload
