import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    publicId: { type: String, required: true }
});


const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [ImageSchema],
    dateOfCompletion: {  // A year in YYYY format
        type: String,
        required: true,
        match: /^\d{4}$/,
    },
    duration: {
        type: String,
        required: false,
    },
    technologies: {
        type: [String],
        required: false,
    },
    link: {
        type: String,
        required: false,
    }
})

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
export { ImageSchema }; // Exporting ImageSchema for use in other models if needed