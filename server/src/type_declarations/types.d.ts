import { Request } from 'express';
import { IUserData } from '../types/types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUserData
  }
}