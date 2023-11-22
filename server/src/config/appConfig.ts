import { Application } from 'express';

import { initDB } from "./dbConfig";
import { initExpress } from "./expressConfig";
import { initRoutes } from './routeConfig';

export async function init(app: Application) {
    await initDB();
    initExpress(app);
    initRoutes(app);
}