import { IUserDTO } from './dtos';
import { Request } from 'express';

export interface AuthRequest<Body = any> extends Request {
    user?: IUserDTO;
    body: Body;
}
