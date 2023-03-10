import {InferSchemaType,model, Schema} from "mongoose";

const userSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    status: {type: String, default: "active"},
    role: {type: String, default: "user"},
    field: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
},{ timestamps: true });

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);