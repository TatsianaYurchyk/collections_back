import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import CollectionModel from "../models/collection";
import { assertIsDefined } from "../util/assertIsDefined";

export const getCollections: RequestHandler = async (req, res, next) => {
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");
	// res.setHeader('Access-control-expose-headers: Set-Cookie','true')
	// const authenticatedUserId = req.session.userId;
	const authenticatedUserId = req.params.userId;

	try {
		// assertIsDefined(authenticatedUserId);
		const collections = await CollectionModel.find({
			userId: authenticatedUserId,
		}).exec();
		res.status(200).json(collections);
	} catch (error) {
		next(error);
	}
};

export const getCollectionsHomePage: RequestHandler = async (
	req,
	res,
	next
) => {
	res.setHeader("Access-Control-Allow-Credentials", "true");
	// res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie')

	try {
		const collections = await CollectionModel.find().exec();
		res.status(200).json(collections);
	} catch (error) {
		next(error);
	}
};

export const getCollection: RequestHandler = async (req, res, next) => {
	res.setHeader("Access-Control-Allow-Credentials", "true");

	const collectionId = req.params.collectionId;
	// const authenticatedUserId = req.session.userId;

	try {
		// assertIsDefined(authenticatedUserId);

		if (!mongoose.isValidObjectId(collectionId)) {
			throw createHttpError(400, "Invalid collection id");
		}

		const collection = await CollectionModel.findById(collectionId).exec();

		if (!collection) {
			throw createHttpError(404, "Collection not found");
		}

		// if (!collection.userId.equals(authenticatedUserId)) {
		//     throw createHttpError(401, "You cannot access this collection");
		// }

		res.status(200).json(collection);
	} catch (error) {
		next(error);
	}
};

interface CreateCollectionBody {
	name: string;
	topic: string;
	description: string;
	fields: Array<string>;
	userId: String;
}

export const createCollection: RequestHandler<
	unknown,
	unknown,
	CreateCollectionBody,
	unknown
> = async (req, res, next) => {
	const name = req.body.name;
	const topic = req.body.topic;
	const description = req.body.description;
	const fields = req.body.fields;
	const authenticatedUserId = req.body.userId;
	// const authenticatedUserId = req.session.userId;

	try {
		// assertIsDefined(authenticatedUserId);

		if (!name) {
			throw createHttpError(400, "Collection must have a name");
		}
		if (!topic) {
			throw createHttpError(400, "Collection must have a topic");
		}
		if (!description) {
			throw createHttpError(400, "Collection must have a description");
		}

		const newCollection = await CollectionModel.create({
			userId: authenticatedUserId,
			name: name,
			topic: topic,
			description: description,
			fields: fields,
		});

		res.status(201).json(newCollection);
	} catch (error) {
		next(error);
	}
};

interface UpdateCollectionParams {
	collectionId: string;
}

interface UpdateCollectionBody {
	name?: string;
	topic?: string;
	description?: string;
	fields: Array<string>;
}

export const updateCollection: RequestHandler<
	UpdateCollectionParams,
	unknown,
	UpdateCollectionBody,
	unknown
> = async (req, res, next) => {
	const collectionId = req.params.collectionId;
	const newName = req.body.name;
	const newTopic = req.body.topic;
	const newDescription = req.body.description;
	const newFields = req.body.fields;
	// const authenticatedUserId = req.session.userId;

	try {
		// assertIsDefined(authenticatedUserId);

		if (!mongoose.isValidObjectId(collectionId)) {
			throw createHttpError(400, "Invalid collection id");
		}
		if (!newName) {
			throw createHttpError(400, "Collection must have a name");
		}
		if (!newDescription) {
			throw createHttpError(400, "Collection must have a description");
		}
		if (!newTopic) {
			throw createHttpError(400, "Collection must have a topic");
		}

		const collection = await CollectionModel.findById(collectionId).exec();

		if (!collection) {
			throw createHttpError(404, "Collection not found");
		}

		// if (!collection.userId.equals(authenticatedUserId)) {
		//     throw createHttpError(401, "You cannot access this collection");
		// }

		collection.name = newName;
		collection.topic = newTopic;
		collection.description = newDescription;
		collection.fields = newFields;

		const updatedCollection = await collection.save();

		res.status(200).json(updatedCollection);
	} catch (error) {
		next(error);
	}
};

export const deleteCollection: RequestHandler = async (req, res, next) => {
	const collectionId = req.params.collectionId;
	// const authenticatedUserId = req.session.userId;

	try {
		// assertIsDefined(authenticatedUserId);

		if (!mongoose.isValidObjectId(collectionId)) {
			throw createHttpError(400, "Invalid collection id");
		}

		const collection = await CollectionModel.findById(collectionId).exec();

		if (!collection) {
			throw createHttpError(404, "Collection not found");
		}

		// if (!collection.userId.equals(authenticatedUserId)) {
		//     throw createHttpError(401, "You cannot access this collection");
		// }

		await collection.remove();

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
