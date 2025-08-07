import mongoose from "mongoose";
import { ImageSchema } from "./Project.js";
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: ImageSchema,
        required: true,
    },
}, {
    timestamps: true,
});
export default mongoose.models.Brand || mongoose.model('Brand', brandSchema);