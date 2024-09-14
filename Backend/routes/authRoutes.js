import { signup, login, logout } from '../controllers/authController.js';
import passport from 'passport';
import express from 'express';
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
const router = express.Router();

// Redirect user to Google's OAuth page
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Successful authentication
        const token = generateTokenAndSetCookie(req.user._id, res);
        const userData = {
            id: req.user._id,
            email: req.user.email,
            fullName: req.user.fullName,
        };

        const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
        
        // Send the user data and token in the response
        res.redirect(`${FRONTEND_URL}/login?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
        // res.json({ token, user: userData });
    }
);

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;