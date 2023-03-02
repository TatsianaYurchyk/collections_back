import { InferSchemaType, model, Schema } from "mongoose";

const itemSchema = new Schema({
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection" },
    name: { type: String, required: true },
    properties : {type:Object},
}, { timestamps: true });

type Item = InferSchemaType<typeof itemSchema>;

export default model<Item>("Item", itemSchema);