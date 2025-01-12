import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female",]
    },
    dob: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    emailVerificationExpires: {
        type: Date
        
    },
    passwordResetExpires: {
        type: Date,
    },
    lastLogin: {
        type: Date,
        default: Date.now() // current time
    },
    googleId: {
        type: String
    }
   
},{
    timestamps: true,
})



// hash password before saving it to the database
userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

//create a function to compare passwords with the schema
userSchema.methods.comparePassword = async function (pass) {
    const isMatch = await bcrypt.compare(pass, this.password)
    return isMatch
}


// check if the model exist before creating
const User = mongoose.models.user || mongoose.model("user", userSchema)
export default User;


