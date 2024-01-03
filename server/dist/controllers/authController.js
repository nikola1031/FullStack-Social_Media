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
exports.logout = exports.register = exports.login = void 0;
const authService = __importStar(require("../services/authService"));
const trimmer_1 = require("../utils/trimmer");
const login = async (req, res) => {
    const trimmedBody = (0, trimmer_1.trimmer)(req.body);
    const { email, password } = trimmedBody;
    try {
        if (!email || !password) {
            throw new Error('All fields are required');
        }
        const user = await authService.login(email.toLocaleLowerCase(), password);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.login = login;
const register = async (req, res) => {
    const trimmedBody = (0, trimmer_1.trimmer)(req.body);
    const { email, username, password, confirmPass, gender } = trimmedBody;
    try {
        if (!email || !username || !password || !confirmPass || !gender) {
            throw new Error('All fields are required');
        }
        if (password !== confirmPass) {
            throw new Error('Passwords must match');
        }
        const user = await authService.register(email.toLocaleLowerCase(), username, password, gender);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
const logout = async (req, res) => {
};
exports.logout = logout;
