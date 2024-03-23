"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFileName = exports.trimmer = void 0;
function trimmer(data) {
    return Object.entries({ ...data }).reduce((prev, [k, v]) => {
        return ({ ...prev, [k]: Array.isArray(v) ? v.map((str) => str.trim()) : v.trim() });
    }, {});
}
exports.trimmer = trimmer;
// Sample Url
// https://firebasestorage.googleapis.com/v0/b/social-media-e7646.appspot.com/o/destination%2F(urlencoded name here)?alt=media&token=79938d3d-54f3-4be4-9df3-a6f0af4d1e09
function parseFileName(url, destination) {
    const regexp = new RegExp(`${destination}%2F(.*?)\\?`);
    const name = decodeURIComponent(url.match(regexp)?.[1] || '');
    return name;
}
exports.parseFileName = parseFileName;
//# sourceMappingURL=helpers.js.map