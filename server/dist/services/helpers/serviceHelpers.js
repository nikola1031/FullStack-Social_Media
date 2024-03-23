"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkObjectIdValidity = exports.savePhotos = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const firebaseStorageService_1 = require("../firebaseStorageService");
const mongoose_1 = __importDefault(require("mongoose"));
const saltRounds = 10;
const hashPassword = async (password) => await bcrypt_1.default.hash(password, saltRounds);
exports.hashPassword = hashPassword;
const comparePasswords = async (password, hash) => await bcrypt_1.default.compare(password, hash);
exports.comparePasswords = comparePasswords;
const savePhotos = async (photos, userId, destination) => {
    if (!photos.length)
        return [];
    let imageUrls = [];
    try {
        imageUrls = await (0, firebaseStorageService_1.uploadImages)(photos, userId, destination);
        return imageUrls;
    }
    catch (error) {
        if (imageUrls.length) {
            imageUrls.forEach((url) => (0, firebaseStorageService_1.deleteImage)(url, destination));
        }
        console.error('Error uploading photos', error);
        throw new Error(error.message);
    }
};
exports.savePhotos = savePhotos;
const checkObjectIdValidity = (...ids) => {
    ids.forEach((id) => {
        if (mongoose_1.default.Types.ObjectId.isValid(id) === false) {
            throw new Error('Invalid ObjectId');
        }
    });
};
exports.checkObjectIdValidity = checkObjectIdValidity;
//# sourceMappingURL=serviceHelpers.js.map