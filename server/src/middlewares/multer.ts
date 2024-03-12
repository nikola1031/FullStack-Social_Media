import { NextFunction, Request, Response } from 'express';
import multer, { MulterError } from 'multer';
import { multerErrors } from '../Constants';

const storage = multer.memoryStorage();

export function multerUpload() {
    const upload = multer({ storage }).array('files', 5);
    return (req: Request, res: Response, next: NextFunction) => {
        upload(req, res, (err) => {
            if (err) {
                if (err instanceof MulterError){
                    return res.status(400).json({ message: multerErrors[err.code] });
                }
                return res.status(400).json({message: err.message});
            }
            next();
        })
    }
}
