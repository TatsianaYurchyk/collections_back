import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth: RequestHandler = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    if (req.session.userId) {
        next();
    } else {
        next(createHttpError(401, "User is not authenticated"));
    }
};