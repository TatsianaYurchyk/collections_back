import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler <unknown, unknown, SignUpBody, unknown> = async (req, res, next) =>{
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    
    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "All parameters are required for registration");
        }

        const existingUsername = await UserModel.findOne({username:username}).exec();
        if (existingUsername){
            throw createHttpError (409,"This username is already taken. Please, log in or choose another one for registration.");
        }

        const existingEmail = await UserModel.findOne({email:email}).exec();
        if (existingEmail){
            throw createHttpError (409,"A user with this email already exists. Please, log in.");
        }

        const passwordHashed =  await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username:username,
            email:email,
            password:passwordHashed,
        });
        
        req.session.userId = newUser._id;
        res.status(201).json(newUser);

    } catch (error) {
        next(error)
    }
}







export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find().exec();
        res.status(200).json(users);
    } catch (error) {
       next(error);

    }
}
