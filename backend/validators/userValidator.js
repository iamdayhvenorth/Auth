import joi from "joi"

 export const validateUser = joi.object({
    name: joi.string().trim().required(),
    password: joi.string().trim().required().min(6),
    email: joi.string().email().required(), 
    dob: joi.date().required(),
    gender: joi.string().required().valid("male","female")
})


export const validatePassword = joi.object({
    password: joi.string().trim().required().min(6),
    confirmPassword: joi.string().required().valid(joi.ref("password")).messages({
        "any.only": "Confirm password must match the password", // Custom error message
      })
})


export const validateChangePassword = joi.object({
    oldPassword: joi.string().required(),
    newPassword: joi.string().trim().required().min(6),
    confirmNewPassword: joi.string().required().valid(joi.ref("newPassword")).messages({
        "any.only": "Confirm password must match the password", // Custom error message
      })
})

export const proileUpdate = joi.object({
    name: joi.string().trim().optional(),
    email: joi.string().email().optional(),
    dob: joi.date().optional(),
    gender: joi.string().optional().valid("male","female")
})



