import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { carpeta } = req.body;
        const route = path.join(__dirname, `../public/${carpeta ?? 'orders'}/`);
        if (!fs.existsSync(route)) fs.mkdirSync(route);
        cb(null, route);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

export const imagenUpload = multer({
    storage,
    limits: {
        fileSize: 100000
    },
    fileFilter(_, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Formato no valido'));
        }
        cb(undefined, true);
    }
});
