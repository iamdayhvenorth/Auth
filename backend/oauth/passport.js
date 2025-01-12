import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth2";
import User from "../models/userModel";

// Passport configuration
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },async (accessToken, refreshToken, profile, done) => {
        const displayImage = profile.photos[0].value; // Display image URL
        try {
            const user = await User.findOne({email:profile.emails[0].value})
            
            if(user) {
                if (!user.googleId) {
                    user.googleId = profile.id;
                    user.lastLogin = Date.now()
                    await user.save();
                  }
                  return done(null, user);
            }
            
            const newUser = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                lastLogin: Date.now(),
                gender: "male",
                dob: new Date("1990-01-01"),
                password:profile.displayName
            })
            await newUser.save();
            
        } catch (error) {
            done(error)
            
        }

    })
)

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });