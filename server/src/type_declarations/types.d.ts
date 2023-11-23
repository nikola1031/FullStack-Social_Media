import { Request } from 'express';
import { IUserData } from '../services/types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUserData
  }
}