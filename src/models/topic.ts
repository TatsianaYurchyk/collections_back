import {InferSchemaType,model, Schema} from "mongoose";

const topicSchema = new Schema ({
    value: {type: String, required: true, unique: true},
    label: {type: String, required: true,},
},{ timestamps: true });

type Topic = InferSchemaType<typeof topicSchema>;

export default model<Topic>("Topic", topicSchema);


  
