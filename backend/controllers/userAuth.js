import RefreshToken from "../models/refreshTokenModel.js"
import User from "../models/userModel.js"
import generateJwtToken from "../utils/jwt.js"
import {validatePassword, validateUser, validateChangePassword,proileUpdate} from "../validators/userValidator.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js"
import { CHANGE_PASSWORD, EMAILVERIFICATION, FORGOT_PASSWORD, RESET_SUCCESSFUL, VERIFICATION_SUCCESSFUL } from "../utils/emailTemplates.js"



// register user controller
export const registeUser = async (req,res)=> {

    // validate all the req.body info 
    const {error,value} = validateUser.validate({...req.body})
      
    if(error) return res.status(400).json({success: false,message: error.details[0].message})
    
    const {name,email,password,dob,gender} = value
   
   
    try {
       //check if user already exist
       const userExist = await User.findOne({email})
   
       if(userExist) return res.status(400).json({message: "User already exist wit this email"})
   
       // generate email verification code
       const emailVerificationToken = Math.floor(100000 + Math.random() * 900000);
   
       //create new user
       const newUser = await User.create({
           name,
           email,
           password,
           emailVerificationToken,
           gender,
           dob,
           emailVerificationExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
       })
   
       //generate access & refresh token
       const accessToken = generateJwtToken({userId:newUser._id}, process.env.JWT_ACCESS_KEY,"1d")
       const refreshToken = generateJwtToken({userId:newUser._id}, process.env.JWT_REFRESH_KEY, "7d")

       // save refresh token to db
       const token = await RefreshToken.create({token:refreshToken,userId:newUser._id})
       
       
       //save token to the cookie
       res.cookie("jwt",refreshToken,{
           httpOnly: true,  // secure cookies only available over HTTPS
           secure: true, // only set cookie over HTTPS
           sameSite: "strict",
           maxAge: 24 * 60 * 60 * 1000, // 1 day
       })
       
       // send email verification
        const msg = `<p style="color:red;">Your email verification code is ${emailVerificationToken}</p>`
        const mailOptions = {
            from: `DaveCodeSolutions ${process.env.AUTH_EMAIL}`,
            to: newUser.email,
            subject: "Email Verification",
            html: EMAILVERIFICATION.replace("{verificationCode}",emailVerificationToken)
        }

      
       const transporter = await sendEmail()

        transporter.sendMail(mailOptions, function (err,info) {
            if(err) console.log(err)
            console.log('Email sent: ' + info.response);
        })


       // return user
       return res.status(201).json({success: true,message: "User registered successfully", user: {...newUser._doc,accessToken,token}})
     
    } catch (error) {
     
       return res.status(500).json({success: false,message: "Server Error", error: error.message})
    }
}

// login user controller
export const loginUser = async (req,res) => {
    const {email,password} = req.body

    if(!email || !password) return res.status(400).json({message: "email & password required"})

    try {
        //verify user
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({success:false, message: "Invalid credentials"})

        //if theres user check if password match
        const isMatch = await user.comparePassword(password,user.password)

        if(!isMatch) return res.status(404).json({success:false, message: "Invalid credentials"})

        //generate access & refresh token
        const accessToken = generateJwtToken({userId:user._id}, process.env.JWT_ACCESS_KEY,"1h")
        const refreshToken = generateJwtToken({userId:user._id}, process.env.JWT_REFRESH_KEY, "7d")

        // check if thers is a valid refresh token if not set refreshtoken to db
        const isToken = await RefreshToken.findOne({userId:user._id,expiresAt:{
            $gt: Date.now()
        }})
        
        if(!isToken) await RefreshToken.create({token:refreshToken, userId:user._id})
        

        user.lastLogin = Date.now()
        await user.save()


        //save token to the cookie
        res.cookie("jwt",refreshToken,{
            httpOnly: true,  // secure cookies only available over HTTPS
            secure: true, // only set cookie over HTTPS
            sameSite: "strict",
            maxAge: 24* 60 * 60 * 1000, // 1 day
        })

        return res.status(200).json({success: true, user: {...user._doc,accessToken,password:undefined}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: "Server Error", error: error.message}) 
    }
}

// logoutUser controller
export const logoutUser = async (req,res) => {
    //delete or remove cookie
    res.clearCookie("jwt")
    return res.status(204).send()
}

// verifyEmail controller
export const verifyEmail = async (req,res) => {
    const {token} = req.body
    if(!token) return res.status(400).json({message: "Token required"})
    
        try {
             // check if token is valid or not expired
            const user = await User.findOne({emailVerificationToken: token,emailVerificationExpires: {
                $gt: Date.now()
            }})

            if(!user) return res.status(400).json({success: false, message: "Invalid or expired token"})
            
            // if token is valid update user email verification status
            user.isVerified = true
            user.emailVerificationToken = undefined
            user.emailVerificationExpires = undefined 
            
            await user.save()

            // send email verification successful
          
            const mailOptions = {
                from: `DaveCodeSolutions ${process.env.AUTH_EMAIL}`,
                to: user.email,
                subject: "Verification Successful",
                html: VERIFICATION_SUCCESSFUL
            }
            
            const transporter = await sendEmail()

            transporter.sendMail(mailOptions, function (err,info) {
                if(err) console.log(err)
                console.log('Email sent: ' + info.response);
            })


            res.status(200).json({success: true, message: "Email verified successfully"})

        } catch (error) {
            console.log(error)
            return res.status(500).json({success:false, message: "Server Error",error: error.message}) 
        }
}

// forgotPassword controller
export const forgotPassword = async (req,res) => {
    const {email} = req.body
    if(!email) return res.status(400).json({message: "Email required"})
    try {
        
        //check if user with the email is valid
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({success: false, message: "Email is not registered"})

        // if user found generate a reset password token and save it to the user's email
        const resetToken = crypto.randomBytes(32).toString("hex") + user._id
       
        //send resetToken to user email and also save to the db
        user.passwordResetToken = resetToken
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000 // expires in 10 minutes
        await user.save()

           // send reset password link to email
           const mailOptions = {
            from: `DaveCodeSolutions ${process.env.AUTH_EMAIL}`,
            to: user.email,
            subject: "Pasword Reset",
            html:FORGOT_PASSWORD.replace("{resetLink}",`${process.env.CLIENT_URL}/password-reset?token=${resetToken}`).replace("{name}",user.name.split(" ")[0])
        }
        
        const transporter = await sendEmail()

        transporter.sendMail(mailOptions, function (err,info) {
            if(err) console.log(err)
            console.log('Email sent: ' + info.response);
        })
        
        return res.status(200).json({success: true, message: "Reset password link sent to the email provided successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
        
    }
    
}

// resetPassword controller
export const resetPassword = async (req,res) => {
    const {token} = req.query

     // validate all the req.body info 
    const {error,value} = validatePassword.validate({...req.body})
    if(error) return res.status(400).json({success: false,message: error.details[0].message})
    const {password} = value

    try {
        //check if token still valid
        const user = await User.findOne({passwordResetToken: token, passwordResetExpires: {$gt: Date.now()}})

        if(!user) return res.status(404).json({success: false, message: "Invalid or expired token, please request for a new link"})
            
        // if token is valid update user password
        user.password = password
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save()

     
          // send mail for successful pasword reset 
          const mailOptions = {
            from: `DaveCodeSolutions ${process.env.AUTH_EMAIL}`,
            to: user.email,
            subject: "Pasword Reset Successful",
            html: RESET_SUCCESSFUL
        }
        
        const transporter = await sendEmail()

        transporter.sendMail(mailOptions, function (err,info) {
            if(err) console.log(err)
            console.log('Email sent: ' + info.response);
        })
        



        return res.status(200).json({success: true, message: "Password reset successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
    }
    
}

//changePassword controller
export const changePassword = async (req,res) => {
    const validUserId = req.user 
    
    const {error,value} = validateChangePassword.validate({...req.body})
    if(error) return res.status(400).json({success: false,message: error.details[0].message})

    const {oldPassword, newPassword} = value

    try {
        //check if valid userid exist in the database
        const user = await User.findById(validUserId)
        
        if(!user) return res.status(401).json({success: false, message: "Unauthorized to change password"})
        
        //check if old password match
        const isMatch = await user.comparePassword(oldPassword,user.password)
        if(!isMatch) return res.status(401).json({success: false, message: "Invalid old password"})

        //update old password to new pas worin the db
        user.password = newPassword
        await user.save()


             // send mail to notify password recently changed
             const mailOptions = {
                from: `DaveCodeSolutions ${process.env.AUTH_EMAIL}`,
                to: user.email,
                subject: "Pasword Change Successful",
                html: CHANGE_PASSWORD.replace("{name}", user.name.split(" ")[0])
            }
            
            const transporter = await sendEmail()
    
            transporter.sendMail(mailOptions, function (err,info) {
                if(err) console.log(err)
                console.log('Email sent: ' + info.response);
            })
            

        res.status(200).json({success: true, message: "Password changed successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
    }

}

//refreshToken controller
export const refreshToken = async (req,res) => {
    //get token from cookie
    const jwtToken = req.cookies.jwt
    if(!jwtToken) return res.status(401).json({message: "Unathorized"})
       
    try {
        //verify if token is still valid or has not expired in the database
        const token = await RefreshToken.findOne({token: jwtToken,expiresAt:{
            $gt: Date.now()
        }})

        console.log(token);
        
       
        if(!token) return res.status(403).json({success: false, message: "Invalid or expired token"})

        //verify the jwt token
        jwt.verify(jwtToken,process.env.JWT_REFRESH_KEY,(err,decoded)=> {
           
            if(err) return res.status(403).json({success: false, message: "Invalid or expired token"})
            
            //generate new access token
            const accessToken = generateJwtToken({userId:decoded.userId}, process.env.JWT_ACCESS_KEY,"1h")
          
            return res.status(200).json({success: true, accessToken});
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
        
    }
        
}

//update profile
export const updateProfile = async (req,res) => {
    const validUserId = req.user
   
    const {error,value} = proileUpdate.validate({...req.body})
    if(error) return res.status(400).json({success: false,message: error.details[0].message})


    try {
        //check if valid userid exist in the database
        const user = await User.findByIdAndUpdate(validUserId,{...value},{new: true, runValidators: true}
        )
      
        if(!user) return res.sendStatus(401)

        return res.status(200).json({success: true, message: "Profile updated successfully", user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
        
    }

}

//getProfile
export const getProfile = async (req,res) => {
    const validUserId = req.user

    try {
        //find user in the database
        const user = await User.findById(validUserId).select(["-refreshToken","-password"])
        
        if(!user) return res.status(401).json({success:false, message: "Unauthorized"})
            
        return res.status(200).json({success: true, message: "Profile retrieved successfully", user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
    }

}

//check auth 
export const checkAuth = async (req,res) => {
    const validUserId = req.user

    try {
        const user = await User.findById(validUserId).select("-password")
        if(!user) return res.status(400).json({success:false, message: "user not found"})
            
        return res.status(200).json({success: true, user})
    } catch (error) {
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
        
    }
}