import bcrypt from 'bcrypt';
import { deleteImage, uploadImages } from '../firebaseStorageService';
import mongoose from 'mongoose';
import { FirebaseImageDestination } from '../../types/types';

const saltRounds = 10;

export const hashPassword = async (password: string) => await bcrypt.hash(password, saltRounds);
export const comparePasswords = async (password: string, hash: string) => await bcrypt.compare(password, hash);

export const savePhotos = async (
    photos: Express.Multer.File[],
    userId: string,
    destination: FirebaseImageDestination
): Promise<string[]> => {
    if (!photos.length) return [];

    let imageUrls: string[] = [];
    
    try {
        imageUrls = await uploadImages(photos, userId, destination);
        return imageUrls;
    } catch (error: any) {
        if (imageUrls.length) {
            imageUrls.forEach((url) => deleteImage(url, destination));
        }
        console.error('Error uploading photos', error);
        throw new Error(error.message);
    }
};

export const checkObjectIdValidity = (...ids: string[]) => {
    ids.forEach((id) => {
        if (mongoose.Types.ObjectId.isValid(id) === false) {
            throw new Error('Invalid ObjectId');
        }
    });
};
