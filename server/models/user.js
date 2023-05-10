import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    ville: {
        type: String,
        trim: true,
        required: true,
    },
    pays: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    image: {
        public_id: "",
        url: "",
    },
    resetCode: "",
},
{ timestamps: true }
);

export default mongoose.model("User", userSchema);