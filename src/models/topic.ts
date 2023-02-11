import {InferSchemaType,model, Schema} from "mongoose";
import mongoose from "mongoose";

const topicSchema = new Schema ({
    value: {type: String, required: true, unique: true},
    label: {type: String, required: true, unique: true},
},{ timestamps: true });

type Topic = InferSchemaType<typeof topicSchema>;


// const Topic = mongoose.model('Topic', topicSchema);
  
// Create collection of Model
// Topic.createCollection().then(function (collection) {
//     console.log('Collection is created!')});





export default model<Topic>("Topic", topicSchema);


  
