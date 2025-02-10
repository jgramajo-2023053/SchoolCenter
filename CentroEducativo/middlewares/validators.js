import { body } from "express-validator"
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
/* import { existUsername, existEmail, notRequiredField, oneDate, oneAnimal  } from "../utils/db.validators.js" */
export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not Required`)
    }
}
//Arreglo de validaciones (por cada ruta)
export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        /* .custom(existEmail) */,
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be Strong')
        .isLength({min: 8})
        .withMessage('Password need min 8 characters'),
    validateErrors
]

export const updateValidator = [
    body('name')
        .optional()
        .notEmpty(),
    body('email')
        .optional()
        .notEmpty(),
    body('password')
        .optional()
        .custom(notRequiredField),
    body('role')
        .optional()
        .custom(notRequiredField),
        validateErrorsWithoutFiles //Des[ues lo vamos a modiicar
]