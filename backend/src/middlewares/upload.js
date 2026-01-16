import multer from "multer";

const storage = multer.memoryStorage(); // no saving to disk
const upload = multer({ storage });

export default upload;
