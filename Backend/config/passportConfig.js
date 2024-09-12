import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import dotenv from 'dotenv'
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const { displayName, emails } = profile;
            try {
                // Check if user already exists
                let user = await User.findOne({ email: emails[0].value });

                if (!user) {
                    // Create a new user if one doesn't exist
                    user = new User({
                        fullName: displayName,
                        email: emails[0].value,
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                console.error("Error in Google OAuth", error);
                return done(error, null);
            }
        }
    )
);

// Serialize user to manage session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;