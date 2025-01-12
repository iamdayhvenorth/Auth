import jwt from "jsonwebtoken";

const verifyToken = async (req,res,next) => {
    // get token from the request
    const authHeader = req.headers["authorization"]
    console.log(authHeader)

    if(!authHeader) return res.status(401).json({message: "Token is required"})
    const token = authHeader.split(" ")[1]

    jwt.verify(token,process.env.JWT_ACCESS_KEY,(err,decoded) =>{
        if(err) return res.status(403).json({message: "Invalid token"})
        req.user = decoded.userId
        next()
    })
    
}

export default verifyToken