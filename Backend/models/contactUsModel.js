import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumbers: [
        {
            type: String,
            required: true,
            trim: true,
        }
    ],
    emails: [
        {
            type: String,
            required: true,
            trim: true,
        }
    ],
},
    { timestamps: true }
);

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

export default ContactUs;