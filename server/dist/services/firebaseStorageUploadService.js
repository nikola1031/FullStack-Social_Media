"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("firebase/storage");
const storage = (0, storage_1.getStorage)();
async function uploadImages(files) {
    const filesArray = Array.isArray(files) ? [...files] : [files];
    try {
        const uploadPromises = filesArray.map(async (file) => {
            const storageRef = (0, storage_1.ref)(storage, `images/${file.originalname}`);
            const metadata = {
                contentType: file.mimetype,
            };
            const snapshot = await (0, storage_1.uploadBytesResumable)(storageRef, file.buffer, metadata);
            return (0, storage_1.getDownloadURL)(snapshot.ref);
        });
        const downloadURLs = await Promise.all(uploadPromises);
        console.log('All uploads completed successfully');
        return downloadURLs;
    }
    catch (error) {
        console.error('Error during uploads:', error);
        throw error; // Re-throw the error to handle it at the caller level
    }
}
