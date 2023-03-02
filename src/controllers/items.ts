import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import ItemModel from "../models/item";
import CollectionModel from "../models/collection";
import { assertIsDefined } from "../util/assertIsDefined";

export const getItems: RequestHandler = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie')
    // res.setHeader('Access-control-expose-headers: Set-Cookie','true')
    // const authenticatedUserId = req.session.userId;
    const collectionId = req.params.collectionId;

    try {
        // assertIsDefined(authenticatedUserId);

        const items = await ItemModel.find({ collectionId: collectionId }).exec();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};

// export const getCollection: RequestHandler = async (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
    
//     const collectionId = req.params.collectionId;
//     const authenticatedUserId = req.session.userId;

//     try {
//         // assertIsDefined(authenticatedUserId);

//         if (!mongoose.isValidObjectId(collectionId)) {
//             throw createHttpError(400, "Invalid collection id");
//         }

//         const collection = await CollectionModel.findById(collectionId).exec();

//         if (!collection) {
//             throw createHttpError(404, "Collection not found");
//         }

//         // if (!collection.userId.equals(authenticatedUserId)) {
//         //     throw createHttpError(401, "You cannot access this collection");
//         // }

//         res.status(200).json(collection);
//     } catch (error) {
//         next(error);
//     }
// };

interface CreateItemBody {
    name: string,
    collectionId: string,
    properties: Object,
    // description: string,
    // fields: Array<string>,
}

export const createItem: RequestHandler<unknown, unknown, CreateItemBody, unknown> = async (req, res, next) => {
    const name = req.body.name;
  
    const collectionId = req.body.collectionId;
    const properties = req.body.properties;
 
    // const fields = req.body.fields;
    // const authenticatedUserId = req.session.userId;

    try {
        // assertIsDefined(authenticatedUserId);

        if (!name) {
            throw createHttpError(400, "Item must have a name");
        }
        // if (!topic) {
        //     throw createHttpError(400, "Collection must have a topic");
        // }
        // if (!description) {
        //     throw createHttpError(400, "Collection must have a description");
        // }

        const newItem = await ItemModel.create({
            // userId: authenticatedUserId,
            collectionId: collectionId,
            name: name,
            properties:properties,
            // description: description,
            // fields: fields,
        });
        


    

        res.status(201).json(newItem);
       
    } catch (error) {
        next(error);
        
    }
};

// interface UpdateCollectionParams {
//     collectionId: string,
// }

// interface UpdateCollectionBody {
//     name?: string,
//     // topic?: mongoose.Types.ObjectId,
//     topic?: string,
//     description?: string,
//     fields: Array<string>,
// }

// export const updateCollection: RequestHandler<UpdateCollectionParams, unknown, UpdateCollectionBody, unknown> = async (req, res, next) => {
//     const collectionId = req.params.collectionId;
//     const newName = req.body.name;
//     const newTopic = req.body.topic;
//     const newDescription = req.body.description;
//     const newFields = req.body.fields;
//     const authenticatedUserId = req.session.userId;

//     try {
//         // assertIsDefined(authenticatedUserId);

//         if (!mongoose.isValidObjectId(collectionId)) {
//             throw createHttpError(400, "Invalid collection id");
//         }

//         if (!newName) {
//             throw createHttpError(400, "Collection must have a name");
//         }
//         if (!newDescription) {
//             throw createHttpError(400, "Collection must have a description");
//         }
//         if (!newTopic) {
//             throw createHttpError(400, "Collection must have a topic");
//         }

//         const collection = await CollectionModel.findById(collectionId).exec();

//         if (!collection) {
//             throw createHttpError(404, "Collection not found");
//         }

//         // if (!collection.userId.equals(authenticatedUserId)) {
//         //     throw createHttpError(401, "You cannot access this collection");
//         // }

//         collection.name = newName;
//         collection.topic = newTopic;
//         collection.description = newDescription;
//         collection.fields = newFields;

//         const updatedCollection = await collection.save();

//         res.status(200).json(updatedCollection);
//     } catch (error) {
//         next(error);
//     }
// };

export const deleteItem: RequestHandler = async (req, res, next) => {
    const collectionId = req.params.collectionId;
    const itemId = req.params.itemId;
    const authenticatedUserId = req.session.userId;

    try {
        // assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(itemId)) {
            throw createHttpError(400, "Invalid item id");
        }

        const item = await ItemModel.findById(itemId).exec();

        if (!item) {
            throw createHttpError(404, "Item not found");
        }

        // if (!collection.userId.equals(authenticatedUserId)) {
        //     throw createHttpError(401, "You cannot access this collection");
        // }

        await item.remove();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};