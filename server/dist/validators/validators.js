"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterImageUrls = void 0;
const filterImageUrls = (imageUrls) => {
    return imageUrls.filter((imageUrl) => imageUrl.startsWith('https://'));
};
exports.filterImageUrls = filterImageUrls;
