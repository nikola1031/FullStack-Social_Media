"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serviceHelpers_1 = require("./helpers/serviceHelpers");
const SECRET = process.env.JWT_SECRET;
async function login(email, password) {
    const existingUser = await User_1.User.findOne({ email });
    if (!existingUser || !(await (0, serviceHelpers_1.comparePasswords)(password, existingUser.password))) {
        throw new Error('Wrong email or password');
    }
    const accessToken = jsonwebtoken_1.default.sign({ email, username: existingUser.username, _id: existingUser._id, gender: existingUser.gender, role: existingUser.role }, SECRET, { expiresIn: '2h' });
    return { email, username: existingUser.username, _id: existingUser._id, gender: existingUser.gender, role: existingUser.role, accessToken };
}
exports.login = login;
async function register(email, username, password, gender) {
    const oldUser = await User_1.User.findOne({ email, username });
    if (oldUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await (0, serviceHelpers_1.hashPassword)(password);
    const user = await User_1.User.create({ email, username, password: hashedPassword, gender });
    const accessToken = jsonwebtoken_1.default.sign({ email, username, _id: user._id, role: user.role, gender }, SECRET, { expiresIn: '2h' });
    return { email, username, role: user.role, _id: user._id, gender, accessToken };
}
exports.register = register;
function logout() { }
exports.logout = logout;
