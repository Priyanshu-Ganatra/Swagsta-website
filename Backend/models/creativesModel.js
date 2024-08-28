import mongoose from 'mongoose';

const creativeSchema = new mongoose.Schema({
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
    likes: {
        type: Number,
        default: 0,
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
            type: String
        }
    ],
},
    { timestamps: true }
);

const Creative = mongoose.model('Creative', creativeSchema);

export default Creative;