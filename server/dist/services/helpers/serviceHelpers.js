"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePhotos = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const firebaseStorageService_1 = require("../firebaseStorageService");
const saltRounds = 10;
const hashPassword = async (password) => await bcrypt_1.default.hash(password, saltRounds);
exports.hashPassword = hashPassword;
const comparePasswords = async (password, hash) => await bcrypt_1.default.compare(password, hash);
exports.comparePasswords = comparePasswords;
const savePhotos = async (photos, userId) => {
    if (!photos.length)
        return [];
    let imageUrls = [];
    try {
        imageUrls = await (0, firebaseStorageService_1.uploadImages)(photos);
        return imageUrls;
    }
    catch (error) {
        if (imageUrls.length) {
            imageUrls.forEach(firebaseStorageService_1.deleteImage);
        }
        console.log('Error uploading photos', error);
        throw new Error(error.message);
    }
};
exports.savePhotos = savePhotos;
//# sourceMappingURL=serviceHelpers.js.map