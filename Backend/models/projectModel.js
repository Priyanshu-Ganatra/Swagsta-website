import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    techDetails: {
        type: String,
        required: true,
        trim: true,
    },
    coverImg: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    otherImages: [
        {
            type: String,
            trim: true,
        }
    ],
    credits: [
        {
            type: String,
            required: true,
            trim: true,
        }
    ],
    storyLine: {
        type: String,
        required: true,
        trim: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProjectComment'
        }
    ],
},
    { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;