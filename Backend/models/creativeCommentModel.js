import mongoose from "mongoose";

const creativeCommentSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    creativeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Creative",
        required: true,
    },
},
    { timestamps: true }
);

const CreativeComment = mongoose.model("CreativeComment", creativeCommentSchema);

export default CreativeComment;