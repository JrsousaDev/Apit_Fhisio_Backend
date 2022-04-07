import { NextFunction, Response, Request } from "express";
import { AppError } from '../errors/AppError';
import jwt from "jsonwebtoken";

export const auth = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if(!authHeader){
      throw new AppError('Token was not provided.');
    }
    
    const [, token] = authHeader.split(' ');

    try {
        jwt.verify(token, process.env.APP_SECRET as string);

        return next();
    } catch (error) {
        throw new AppError('Invalid token.');
    }
}