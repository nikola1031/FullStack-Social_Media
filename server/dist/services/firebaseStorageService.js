"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImages = void 0;
const storage_1 = require("firebase/storage");
const firebaseConfig_1 = require("../config/firebaseConfig");
const helpers_1 = require("../utils/helpers");
const Constants_1 = require("../Constants");
const storage = (0, storage_1.getStorage)(firebaseConfig_1.firebaseApp);
async function uploadImages(files, userId, destination) {
    const filesArray = [...files];
    if (!filesArray.length) {
        return [];
    }
    try {
        const uploadPromises = filesArray.map(async (file) => {
            const storageRef = (0, storage_1.ref)(storage, `${destination}/${userId}|${file.originalname}|${Date.now()}`);
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
        throw new Error(Constants_1.uploadFailedMessage);
    }
}
exports.uploadImages = uploadImages;
async function deleteImage(url, destination) {
    const imageName = (0, helpers_1.parseFileName)(url, destination);
    const imageRef = (0, storage_1.ref)(storage, `${destination}/${imageName}`);
    try {
        await (0, storage_1.deleteObject)(imageRef);
        console.log('Image deleted successfully');
    }
    catch (error) {
        console.error(error);
        throw new Error(Constants_1.imageDeletionFailurMessage);
    }
}
exports.deleteImage = deleteImage;
//# sourceMappingURL=firebaseStorageService.js.map