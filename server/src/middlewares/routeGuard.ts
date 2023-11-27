import { NextFunction, Request, Response } from "express";

function onlyGuests() {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            res.status(401).json({message: 'Guest route cannot be reached'})
            return;
        }
        next();
    };
}

function onlyUsers() {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            res.status(401).json({message: 'Login required'})
            return;
        }
        next();
    };
}

function onlyAdmins() {
    return async function (req: Request, res: Response, next: NextFunction) {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }
        next();
    }
}

function onlyAuthors(Model: any) {
    return async function (req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        // Naming convetion in routes for IDs - :postId, :commentId
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
        } catch (error) {
            res.status(500).json({ message: 'Error checking resource ownership', error });
        }
    };
}

export { onlyGuests, onlyUsers, onlyAuthors, onlyAdmins }