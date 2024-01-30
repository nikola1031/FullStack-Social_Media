import bcrypt from 'bcrypt';
import { deleteImage, uploadImages } from '../firebaseStorageService';

const saltRounds = 10;

export const hashPassword = async (password: string) => await bcrypt.hash(password, saltRounds);
export const comparePasswords = async (password: string, hash: string) => await bcrypt.compare(password, hash);

export const savePhotos = async (photos: Express.Multer.File[], userId: string): Promise<string[]> => {
    if (!photos.length) return [];
    let imageUrls: string[] = [];
    try {
        imageUrls = await uploadImages(photos);
        return imageUrls;
    } catch (error: any) {
        if (imageUrls.length) {
            imageUrls.forEach(deleteImage)
        }
        console.log('Error uploading photos', error)
        throw new Error(error.message)
    }
}