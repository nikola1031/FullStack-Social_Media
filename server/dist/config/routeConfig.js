"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const userController_1 = require("../controllers/userController");
function initRoutes(app) {
    app.use('/auth', userController_1.router);
}
exports.initRoutes = initRoutes;
