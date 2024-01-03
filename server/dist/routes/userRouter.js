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
const userController = __importStar(require("../controllers/userController"));
const routeGuard_1 = require("../middlewares/routeGuard");
const router = (0, express_1.Router)();
router.get('/profile', (0, routeGuard_1.onlyUsers)(), userController.getProfile);
router.put('/profile', (0, routeGuard_1.onlyUsers)(), userController.updateProfile);
router.post('/profile/photos', (0, routeGuard_1.onlyUsers)(), userController.postPhotos);
router.get('/profile/:userId/photos', userController.updateProfile);
router.put('/profile/password', (0, routeGuard_1.onlyUsers)(), userController.updatePassword);
router.put('/profile/picture', (0, routeGuard_1.onlyUsers)(), userController.updateProfilePicture);
router.post('/friend/:userId/request', (0, routeGuard_1.onlyUsers)(), userController.toggleSendFriendRequest);
router.post('/friend/:userId/request/deny', (0, routeGuard_1.onlyUsers)(), userController.denyFriendRequest);
router.post('/friend/:userId/confirm', (0, routeGuard_1.onlyUsers)(), userController.toggleAddFriend);
router.post('/follow/:userId', (0, routeGuard_1.onlyUsers)(), userController.toggleFollow);
exports.default = router;
