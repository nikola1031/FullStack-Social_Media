"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController = __importStar(require("../controllers/commentController"));
const routeGuard_1 = require("../middlewares/routeGuard");
const Comment_1 = require("../models/Comment");
const router = (0, express_1.Router)({ mergeParams: true });
router.post('/', (0, routeGuard_1.onlyUsers)(), commentController.createComment);
router.get('/', (0, routeGuard_1.onlyUsers)(), commentController.getAllComments);
router.put('/:commentId', (0, routeGuard_1.onlyAuthors)(Comment_1.Comment), commentController.updateComment);
router.delete('/:commentId', (0, routeGuard_1.onlyAuthors)(Comment_1.Comment), commentController.deleteComment);
router.post('/:commentId/like', (0, routeGuard_1.onlyUsers)(), commentController.likeComment);
exports.default = router;
//# sourceMappingURL=commentRouter.js.map