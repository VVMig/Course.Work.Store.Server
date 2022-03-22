import { IUserDTO } from './dtos';
import { Request } from 'express';

export interface AuthRequest extends Request {
    user?: IUserDTO;
}