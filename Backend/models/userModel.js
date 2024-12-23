import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    pfp: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;