import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js'
import creativesRoutes from './routes/creativesRoutes.js'

dotenv.config();
const PORT = process.env.PORT || 8000
const DATABASE_URL = process.env.MONGO_URI || 'mongodb+srv://priyanshuganatra:P372tFZFxUSKK2FH@cluster0.iesqvig.mongodb.net/Swagsta'

const app = express()
// Parse incoming requests data 
app.use(express.json())
app.use(cookieParser()); // to parse incoming requests with cookies
app.use(express.urlencoded({ extended: true })); // to parse incoming requests with urlencoded payloads

// middleware for handling CORS Policy
// Allow all origins with default of cors(*)
app.use(cors())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/creatives", creativesRoutes)

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
