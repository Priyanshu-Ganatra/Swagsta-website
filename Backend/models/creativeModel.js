import mongoose from 'mongoose';

const creativeSchema = new mongoose.Schema({
    creatorName: {
        type: String,
        required: true,
        trim: true
    },
    creatorProfession: {
        type: String,
        required: true,
        trim: true
    },
    creatorProfilePic: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    softwareUsed: [
        {
            type: String,
            required: true,
            trim: true,
            enum: ['pureref', 'zbrush', 'maya', 'blender', 'photoshop']
        }
    ],
    coverImg: {
        type: String,
        required: true,
        trim: true
    },
    otherMedia: [
        {
            type: String,
            trim: true
        }
    ],
    tags: [
        {
            type: String,
            required: true,
            trim: true
        }
    ],
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    views: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CreativeComment'
        }
    ],
    featured: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);

const Creative = mongoose.model('Creative', creativeSchema);

export default Creative;