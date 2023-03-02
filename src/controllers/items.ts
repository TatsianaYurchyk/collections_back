import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import ItemModel from "../models/item";
import CollectionModel from "../models/collection";
import { assertIsDefined } from "../util/assertIsDefined";

export const getItems: RequestHandler = async (req, res, next) => {
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");
	// res.setHeader('Access-control-expose-headers: Set-Cookie','true')
	// const authenticatedUserId = req.session.userId;
	const collectionId = req.params.collectionId;

	try {
		// assertIsDefined(authenticatedUserId);

		const items = await ItemModel.find({
			collectionId: collectionId,
		}).exec();
		res.status(200).json(items);
	} catch (error) {
		next(error);
	}
};

interface CreateItemBody {
	name: string;
	collectionId: string;
	properties: Object;
}

export const createItem: RequestHandler<
	unknown,
	unknown,
	CreateItemBody,
	unknown
> = async (req, res, next) => {
	const name = req.body.name;

	const collectionId = req.body.collectionId;
	const properties = req.body.properties;

	// const authenticatedUserId = req.session.userId;

	try {
		// assertIsDefined(authenticatedUserId);

		if (!name) {
			throw createHttpError(400, "Item must have a name");
		}

		const newItem = await ItemModel.create({
			// userId: authenticatedUserId,
			collectionId: collectionId,
			name: name,
			properties: properties,
		});

		res.status(201).json(newItem);
	} catch (error) {
		next(error);
	}
};

interface UpdateItemParams {
	itemId: string;
}

interface UpdateItemBody {
	name: string;
	collectionId: string;
	properties: Object;
}

export const updateItem: RequestHandler<
	UpdateItemParams,
	unknown,
	UpdateItemBody,
	unknown
> = async (req, res, next) => {
	const itemId = req.params.itemId;
	const newName = req.body.name;
	const newProperties = req.body.properties;
	// const authenticatedUserId = req.session.userId;

	try {
		// assertIsDefined(authenticatedUserId);

		if (!mongoose.isValidObjectId(itemId)) {
			throw createHttpError(400, "Invalid item id");
		}

		if (!newName) {
			throw createHttpError(400, "Item must have a name");
		}

		const item = await ItemModel.findById(itemId).exec();

		if (!item) {
			throw createHttpError(404, "item not found");
		}

		// if (!collection.userId.equals(authenticatedUserId)) {
		//     throw createHttpError(401, "You cannot access this item");
		// }

		item.name = newName;
		item.properties = newProperties;

		const updatedItem = await item.save();

		res.status(200).json(updatedItem);
	} catch (error) {
		next(error);
	}
};

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
		//     throw createHttpError(401, "You cannot access this item");
		// }

		await item.remove();

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
