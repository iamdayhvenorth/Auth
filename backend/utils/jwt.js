import jwt from "jsonwebtoken"
const generateJwtToken = (payload,secretKey,duration) => {
   return jwt.sign(payload,secretKey,{
        expiresIn: duration
    })
}

export default generateJwtToken;