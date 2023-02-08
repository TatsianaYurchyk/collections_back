import { InferSchemaType, model, Schema } from "mongoose";

const collectionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    //topic: { type: String, required: true },
    topic: { type: String, required: true, topic:["books", "films"]} ,
    description: { type: String, required: true },
    fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }]
}, { timestamps: true });

type Collection = InferSchemaType<typeof collectionSchema>;

export default model<Collection>("Collection", collectionSchema);