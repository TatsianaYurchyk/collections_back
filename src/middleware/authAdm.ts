import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";

// export const requiresAdmin: RequestHandler = (req, res, next) => {
//     if (req.user.role=) {
//         next();
//     } else {
//         next(createHttpError(401, "User not authenticated"));
//     }
// };

// function isAdmin(user) {
//     return (
//       user.role === "admin"
//     //   || project.userId === user.id
//     )
//   }

// function authGetProject(req, res, next) {
//     if (!canViewProject(req.user, req.project)) {
//       res.status(401)
//       return res.send('Not Allowed')
//     }
  
//     next()
//   }

export const requiresAdm: RequestHandler = async (req, res, next) => {
    const user = await UserModel.findById(req.session.userId).select("+email").exec();
    if (user && user.role === "admin") {
        next()
    }
    else{
        res.status(401)
        return res.send('Not allowed')
    }
};


// function authRole(role: any) {
//     return (req, res, next) => {
//       if (req.user.role !== role) {
//         res.status(401)
//         return res.send('Not allowed')
//       }
  
//       next()
//     }
//   }