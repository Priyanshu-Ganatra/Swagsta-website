import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: { type: String, required: true },
    creatives: [
        {
            creativeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Creative",
            },
            _id: false,
        },
    ],
},
    { timestamps: true }
);

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;