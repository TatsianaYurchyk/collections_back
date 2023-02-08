import { InferSchemaType, model, Schema } from "mongoose";

const fieldSchema = new Schema({
    collectionId: { type: Schema.Types.ObjectId, required: true },
    string1: { type: String, },
    string2: { type: String, },
    string3: { type: String, },
    number1: { type: Number, },
    number2: { type: Number, },
    number3: { type: Number, },
    date1: { type: Date, },
    date2: { type: Date, },
    date3: { type: Date, },
    boolean1: { type: Boolean, },
    boolean2: { type: Boolean, },
    boolean3: { type: Boolean, },
    text1: { type: String, },
    text2: { type: String, },
    text3: { type: String, },
   
}, { timestamps: true });

type Field = InferSchemaType<typeof fieldSchema>;

export default model<Field>("Field", fieldSchema);