import express from 'express';
import { init } from './config/appConfig';

const app = express();
const port = process.env.PORT || 3000;

init(app);

app.listen(port, () => console.log('Server is listening on port ' + port));