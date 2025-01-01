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
    mobile:{
        type: Number,
        trim: true,
    },
    whatsapp:{
        type: Number,
        trim: true,
    },
    isWhatsappNumberSameAsMobile:{
        type: Boolean,
        default: false
    },
    dob: {
        type: Date,
    },
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        }
    ]
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;