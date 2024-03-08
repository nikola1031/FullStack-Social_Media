"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const dbConfig_1 = require("./dbConfig");
const expressConfig_1 = require("./expressConfig");
const routeConfig_1 = require("./routeConfig");
const auth_1 = require("../middlewares/auth");
const errorHandler_1 = require("../utils/errorHandler");
async function init(app) {
    await (0, dbConfig_1.initDB)();
    (0, expressConfig_1.initExpress)(app);
    app.use((0, auth_1.auth)());
    (0, routeConfig_1.initRoutes)(app);
    app.use((0, errorHandler_1.errorHandler)());
}
exports.init = init;
//# sourceMappingURL=appConfig.js.map