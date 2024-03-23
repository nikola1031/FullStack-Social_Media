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
const helpers_1 = require("../utils/helpers");
const errorHandler_1 = require("../utils/errorHandler");
const Constants_1 = require("../Constants");
const login = async (req, res, next) => {
    const trimmedBody = (0, helpers_1.trimmer)(req.body);
    const { email, password } = trimmedBody;
    try {
        if (!email || !password) {
            throw new Error(Constants_1.allFieldsRequiredValidationMessage);
        }
        const user = await authService.login(email.toLocaleLowerCase(), password);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json((0, errorHandler_1.errorHandler)(error));
    }
};
exports.login = login;
const register = async (req, res, next) => {
    const trimmedBody = (0, helpers_1.trimmer)(req.body);
    const { email, username, password, confirmPass, gender } = trimmedBody;
    try {
        if (!email || !username || !password || !confirmPass || !gender) {
            throw new Error(Constants_1.allFieldsRequiredValidationMessage);
        }
        if (password !== confirmPass) {
            throw new Error(Constants_1.passwordsMustMatchMessage);
        }
        const user = await authService.register(email.toLocaleLowerCase(), username, password, gender);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json((0, errorHandler_1.errorHandler)(error));
    }
};
exports.register = register;
const logout = async (req, res) => {
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map