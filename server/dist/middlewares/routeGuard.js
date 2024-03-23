"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyAdmins = exports.onlyAuthors = exports.onlyUsers = exports.onlyGuests = void 0;
const Constants_1 = require("../Constants");
function onlyGuests() {
    return function (req, res, next) {
        if (req.user) {
            res.status(401).json({ message: Constants_1.alreadyLoggedInMessage });
            return;
        }
        next();
    };
}
exports.onlyGuests = onlyGuests;
function onlyUsers() {
    return function (req, res, next) {
        if (!req.user) {
            res.status(401).json({ message: Constants_1.loginRequiredMessage });
            return;
        }
        next();
    };
}
exports.onlyUsers = onlyUsers;
function onlyAdmins() {
    return async function (req, res, next) {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: Constants_1.unauthorizedActionMessage });
        }
        next();
    };
}
exports.onlyAdmins = onlyAdmins;
function onlyAuthors(Model) {
    return async function (req, res, next) {
        if (!req.user) {
            return res.status(403).json({ message: Constants_1.unauthorizedActionMessage });
        }
        // Naming convention in routes for IDs - :postId, :commentId
        const resourceId = req.params[Model.modelName.toLowerCase() + 'Id'];
        const userId = req.user._id;
        try {
            const resource = await Model.findById(resourceId);
            if (!resource) {
                return res.status(404).json({ message: Constants_1.resourceNotFoundMessage });
            }
            if (resource.author.toString() !== userId.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: Constants_1.unauthorizedActionMessage });
            }
            next();
        }
        catch (error) {
            res.status(500).json({ message: Constants_1.resourceOwnershipMessage, error });
        }
    };
}
exports.onlyAuthors = onlyAuthors;
//# sourceMappingURL=routeGuard.js.map