import mongoose from "mongoose";

const projectCommentSchema = new mongoose.Schema({
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
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
},
    { timestamps: true }
);

const ProjectComment = mongoose.model("ProjectComment", projectCommentSchema);

export default ProjectComment;