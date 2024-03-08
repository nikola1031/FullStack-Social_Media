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
const postController = __importStar(require("../controllers/postController"));
const routeGuard_1 = require("../middlewares/routeGuard");
const Post_1 = require("../models/Post");
const multer_1 = require("../middlewares/multer");
const router = (0, express_1.Router)();
router.post('/', (0, routeGuard_1.onlyUsers)(), multer_1.upload.array('files', 5), postController.createPost);
router.get('/', (0, routeGuard_1.onlyUsers)(), postController.getPosts);
router.get('/user/:userId', postController.getPosts);
router.put('/:postId', (0, routeGuard_1.onlyAuthors)(Post_1.Post), postController.updatePost);
router.delete('/:postId', (0, routeGuard_1.onlyAuthors)(Post_1.Post), postController.deletePost);
router.post('/:postId/like', (0, routeGuard_1.onlyUsers)(), postController.likePost);
exports.default = router;
//# sourceMappingURL=postRouter.js.map