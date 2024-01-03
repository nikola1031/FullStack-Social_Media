"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyAdmins = exports.onlyAuthors = exports.onlyUsers = exports.onlyGuests = void 0;
function onlyGuests() {
    return function (req, res, next) {
        if (req.user) {
            res.status(401).json({ message: 'Guest route cannot be reached' });
            return;
        }
        next();
    };
}
exports.onlyGuests = onlyGuests;
function onlyUsers() {
    return function (req, res, next) {
        if (!req.user) {
            res.status(401).json({ message: 'Login required' });
            return;
        }
        next();
    };
}
exports.onlyUsers = onlyUsers;
function onlyAdmins() {
    return async function (req, res, next) {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }
        next();
    };
}
exports.onlyAdmins = onlyAdmins;
function onlyAuthors(Model) {
    return async function (req, res, next) {
        if (!req.user) {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }
        // Naming convention in routes for IDs - :postId, :commentId
        const resourceId = req.params[Model.modelName.toLowerCase() + 'Id'];
        const userId = req.user._id;
        try {
            const resource = await Model.findById(resourceId);
            if (!resource) {
                return res.status(404).json({ message: 'Resource not found' });
            }
            if (resource._ownerId.toString() !== userId.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'You are not authorized to perform this action' });
            }
            next();
        }
        catch (error) {
            res.status(500).json({ message: 'Error checking resource ownership', error });
        }
    };
}
exports.onlyAuthors = onlyAuthors;
