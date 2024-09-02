import mongoose from 'mongoose';

const servicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    services: [
        {
            title: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                required: true,
                trim: true,
            },
        }
    ],
},
    { timestamps: true }
);

const Services = mongoose.model('Services', servicesSchema);

export default Services;