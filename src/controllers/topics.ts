import TopicModel from "../models/topic";
import mongoose from "mongoose";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { assertIsDefined } from "../util/assertIsDefined";

// const Topic1 = TopicModel.create({value:"Books",label:"Books",});       
// const Topic2 = TopicModel.create({value:"Films",label:"Films"});       
// const Topic3 = TopicModel.create({value:"Meals",label:"Meals"});       
// const Topic4 = TopicModel.create({value:"Alcohol",label:"Alcohol"});       
// const Topic5 = TopicModel.create({value:"Travelling",label:"Travelling"});       

export const getTopics: RequestHandler = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    // const authenticatedUserId = req.session.userId;

    try {
        // assertIsDefined(authenticatedUserId);
        const topics = await TopicModel.find().exec();
        res.status(200).json(topics);
    } catch (error) {
        next(error);
    }
};
