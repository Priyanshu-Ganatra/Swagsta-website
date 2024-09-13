import mongoose from 'mongoose';

const caseStudiesSchema = new mongoose.Schema({
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
    primaryImg: {
        type: String,
        required: true,
        trim: true,
    },
    secondaryImg: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    clientIntro: {
        type: String,
        required: true,
        trim: true,
    },
},
    { timestamps: true }
);

const CaseStudies = mongoose.model('CaseStudies', caseStudiesSchema);

export default CaseStudies;