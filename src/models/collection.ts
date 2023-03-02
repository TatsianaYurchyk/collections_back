import { InferSchemaType, model, Schema } from "mongoose";

const collectionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    fields:{type: Array},
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
}, { timestamps: true });

type Collection = InferSchemaType<typeof collectionSchema>;

export default model<Collection>("Collection", collectionSchema);