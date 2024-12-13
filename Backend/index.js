import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'
import session from 'express-session';
import { cloudinaryConnect } from './config/cloudinary.js';
import passportConfig from './config/passportConfig.js'

import authRoutes from './routes/authRoutes.js'
import projectsRoutes from './routes/projectsRoutes.js'
import aboutUsRoutes from './routes/aboutUsRoutes.js'
import contactUsRoutes from './routes/contactUsRoutes.js'
import servicesRoutes from './routes/servicesRoutes.js'
import caseStudiesRoutes from './routes/caseStudiesRoutes.js'
import creativeRoutes from './routes/creativeRoutes.js'
import profileRoutes from './routes/profileRoutes.js'

dotenv.config();
const PORT = process.env.PORT || 8000
const DATABASE_URL = process.env.MONGO_URI || 'mongodb+srv://priyanshuganatra:P372tFZFxUSKK2FH@cluster0.iesqvig.mongodb.net/Swagsta'

const app = express()
// Increase payload size limits
app.use(express.json({ limit: '100mb' })); // Increase limit for JSON payloads
app.use(express.urlencoded({ extended: true, limit: '100mb' })); // Increase limit for URL-encoded payloads

app.use(cookieParser()); // to parse incoming requests with cookies

// middleware for handling CORS Policy
// Allow all origins with default of cors(*)
app.use(cors({ credentials: true, origin: true })); // credentials means cookies are allowed to be sent
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set `secure: true` if using HTTPS
}));

app.use(passportConfig.initialize());
app.use(passportConfig.session());
// Connecting to cloudinary
cloudinaryConnect();

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/projects", projectsRoutes)
app.use("/api/v1/aboutUs", aboutUsRoutes)
app.use("/api/v1/contactUs", contactUsRoutes)
app.use("/api/v1/services", servicesRoutes)
app.use("/api/v1/caseStudies", caseStudiesRoutes)
app.use("/api/v1/creative", creativeRoutes)
app.use("/api/v1/profile", profileRoutes)

    ; (
        async () => {
            try {
                app.listen(PORT, () => {
                    console.log(`Server is running on port ${PORT}`)
                });
                await mongoose.connect(DATABASE_URL)
                console.log('Connected to MongoDB')
            } catch (error) {
                console.log('error', error)
            }
        }
    )();
