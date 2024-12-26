import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    buildingOrStreetName: {
        type: String,
        trim: true,
    },
    areaOrLandmarks: {
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

const Adress = mongoose.model('Adress', addressSchema);

export default Adress;