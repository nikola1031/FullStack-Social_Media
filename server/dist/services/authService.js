"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serviceHelpers_1 = require("./helpers/serviceHelpers");
const Constants_1 = require("../Constants");
const SECRET = process.env.JWT_SECRET;
async function login(email, password) {
    const existingUser = await User_1.User.findOne({ email });
    if (!existingUser || !(await (0, serviceHelpers_1.comparePasswords)(password, existingUser.password))) {
        throw new Error(Constants_1.wrongEmailOrPasswordMessage);
    }
    const userData = {
        email,
        username: existingUser.username,
        bio: existingUser.bio,
        gender: existingUser.gender,
        role: existingUser.role,
        profilePicture: existingUser.profilePicture || '',
        _id: existingUser._id
    };
    const accessToken = jsonwebtoken_1.default.sign(userData, SECRET, { expiresIn: Constants_1.jwtExpirationTime });
    return { ...userData, accessToken };
}
exports.login = login;
async function register(email, username, password, gender) {
    const existingEmail = await User_1.User.findOne({ email });
    const existingUsername = await User_1.User.findOne({ username });
    if (existingEmail || existingUsername) {
        throw new Error(Constants_1.accountExistsValidationMessage);
    }
    const hashedPassword = await (0, serviceHelpers_1.hashPassword)(password);
    const user = await User_1.User.create({ email, username, password: hashedPassword, gender });
    const userData = {
        email,
        username,
        bio: user.bio,
        gender: user.gender,
        role: user.role,
        profilePicture: user.profilePicture || '',
        _id: user._id
    };
    const accessToken = jsonwebtoken_1.default.sign(userData, SECRET, { expiresIn: Constants_1.jwtExpirationTime });
    return { ...userData, accessToken };
}
exports.register = register;
function logout() { }
exports.logout = logout;
//# sourceMappingURL=authService.js.map