"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImages = void 0;
const storage_1 = require("firebase/storage");
const firebaseConfig_1 = require("../config/firebaseConfig");
const imageNameExtractor_1 = require("../utils/imageNameExtractor");
const storage = (0, storage_1.getStorage)(firebaseConfig_1.firebaseApp);
async function uploadImages(files) {
    const filesArray = [...files];
    if (!filesArray.length) {
        return [];
    }
    try {
        const uploadPromises = filesArray.map(async (file) => {
            const storageRef = (0, storage_1.ref)(storage, `images/${file.originalname} ${Date.now()}`);
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
        throw error;
    }
}
exports.uploadImages = uploadImages;
async function deleteImage(url) {
    const imageName = (0, imageNameExtractor_1.extractImageName)(url);
    const imageRef = (0, storage_1.ref)(storage, `images/${imageName}`);
    (0, storage_1.deleteObject)(imageRef).then(() => {
        console.log('Image deleted successfully');
    }).catch((error) => {
        console.error('Uh-oh, an error occurred while deleting photo!');
    });
}
exports.deleteImage = deleteImage;
//# sourceMappingURL=firebaseStorageService.js.map