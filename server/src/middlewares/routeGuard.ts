import { NextFunction, Request, Response } from "express";
import { alreadyLoggedInMessage, loginRequiredMessage, resourceNotFoundMessage, resourceOwnershipMessage, unauthorizedActionMessage } from "../Constants";

function onlyGuests() {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            res.status(401).json({message: alreadyLoggedInMessage})
            return;
        }
        next();
    };
}

function onlyUsers() {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            res.status(401).json({message: loginRequiredMessage})
            return;
        }
        next();
    };
}

function onlyAdmins() {
    return async function (req: Request, res: Response, next: NextFunction) {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: unauthorizedActionMessage });
        }
        next();
    }
}

function onlyAuthors(Model: any) {
    return async function (req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            return res.status(403).json({ message: unauthorizedActionMessage });
        }

        // Naming convention in routes for IDs - :postId, :commentId
        const resourceId = req.params[Model.modelName.toLowerCase() + 'Id'];
        const userId = req.user._id;

        try {
            const resource = await Model.findById(resourceId);

            if (!resource) {
                return res.status(404).json({ message: resourceNotFoundMessage });
            }

            if (resource.author.toString() !== userId.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: unauthorizedActionMessage });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: resourceOwnershipMessage, error });
        }
    };
}

export { onlyGuests, onlyUsers, onlyAuthors, onlyAdmins }