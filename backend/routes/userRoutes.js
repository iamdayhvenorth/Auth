import express from "express"
import { 
    forgotPassword, 
    loginUser, 
    logoutUser, 
    registeUser, 
    resetPassword, 
    verifyEmail,
    changePassword,
    refreshToken,
    updateProfile,
    getProfile,
    checkAuth
} from "../controllers/userAuth.js"
import verifyToken from "../middlewares/verifyJwt.js"

const router = express.Router()


// auth routes
router.post("/register",registeUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password",resetPassword)
router.get("/refresh-token",refreshToken)

// protected routes
router.post("/change-password",verifyToken,changePassword)
router.put("/profile",verifyToken,updateProfile)
router.get("/profile",verifyToken,getProfile)
router.get("/check-auth",verifyToken,checkAuth)

export default router;