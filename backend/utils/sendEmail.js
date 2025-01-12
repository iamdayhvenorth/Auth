import nodemailer from "nodemailer"

const sendEmail = async (recipient,subject,message) => {
   
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: 'smtp.gmail.com',
        port: 465, //587
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    return transporter

        
   
}

export default sendEmail

