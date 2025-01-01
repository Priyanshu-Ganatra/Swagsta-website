import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    lineOne: {
        type: String,
        trim: true,
    },
    lineTwo: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
},
    { timestamps: true }
);

const Address = mongoose.model('Address', addressSchema);

export default Address;