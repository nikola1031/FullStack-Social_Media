"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/login', (req, res) => {
    res.render('<div><h1>Hello World</h1></div');
});
router.post('/register', (req, res) => {
});
router.get('/logout', (req, res) => {
});
