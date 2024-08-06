import { Application } from 'express';

import { initDB } from './dbConfig';
import { initExpress } from './expressConfig';
import { initRoutes } from './routeConfig';
import { auth } from '../middlewares/auth';
import { apiDoc } from '../swagger-documentation/swagger-doc';
import swaggerUi from 'swagger-ui-express';

export async function init(app: Application) {
    await initDB();
    initExpress(app);
    app.use(auth());
    app.use(
        '/docs',
        swaggerUi.serve,
        swaggerUi.setup(apiDoc)
    );
    initRoutes(app);
}
