"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimmer = void 0;
function trimmer(data) {
    return Object.entries({ ...data }).reduce((prev, [k, v]) => {
        return ({ ...prev, [k]: Array.isArray(v) ? v.map((str) => str.trim()) : v.trim() });
    }, {});
}
exports.trimmer = trimmer;
