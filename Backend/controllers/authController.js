import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import OTP from "../models/otpModel.js";
import User from "../models/userModel.js";
import otpGenerator from "otp-generator"
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { fullName, email, password, otp } = req.body;

        // console.log(fullName, email, password, otp);

        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "This E-mail has already been taken" });
        }

        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
        // console.log(response)
        if (response.length === 0) {
            // OTP not found for this email
            return res.status(400).json({
                success: false,
                message: "The OTP is expired",
            })
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            const savedUser = await newUser.save()
            savedUser.password = undefined
            res.status(201).json({ success: true, message: "Signup successful", savedUser })
        } else {
            res.status(400).json({ success: false, message: "Server failed to signup" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Send OTP For Email Verification
export const sendotp = async (req, res) => {
    try {
        const { email } = req.body
        // Check if user is already present
        // Find user with provided email
        const checkUserPresent = await User.findOne({ email })
        // to be used in case of signup

        // If user found with provided email
        if (checkUserPresent) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                error: `This e-mail is already registered, use a different e-mail or login instead`,
            })
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        const result = await OTP.findOne({ otp: otp })

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            })
        }
        const otpPayload = { email, otp }
        await OTP.create(otpPayload)
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // this can be further used for protecting routes using middleware for requests that require authentication
        // as of now we aren't using protected routes, so commenting this out won't affect the functionality
        generateTokenAndSetCookie(user._id, res);

        user.password = undefined;
        res.status(200).json({ message: "Login successful", user })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};