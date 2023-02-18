import { InferSchemaType, model, Schema } from "mongoose";

const collectionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    // topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    fields:{type: Array},
    // fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }],
    // items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
}, { timestamps: true });

type Collection = InferSchemaType<typeof collectionSchema>;

export default model<Collection>("Collection", collectionSchema);