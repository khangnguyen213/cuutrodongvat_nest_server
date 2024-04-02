import { Request } from 'express';

export interface RequestWithTokenData extends Request {
  user: {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    avatar: string;
    password: string;
  };
}
