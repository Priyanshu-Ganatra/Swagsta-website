import mongoose from 'mongoose';

const aboutUsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
        type: String,
        trim: true,
    },
    socials: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
                enum: ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'whatsapp', 'behance'],
            },
            link: {
                type: String,
                required: true,
                trim: true,
            },   
        }
    ],
},
    { timestamps: true }
);

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

export default AboutUs;