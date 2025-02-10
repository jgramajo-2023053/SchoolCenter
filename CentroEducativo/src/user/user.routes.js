import { Router } from "express"
import { 
    putUser, 
    deleteUser
} from "./user.controller.js"
import { validateJwt, authorizeRole } from '../../middlewares/validate.jwt.js'
import { updateValidator } from "../../middlewares/validators.js"


const api = Router()


api.delete('/delete/:id', [validateJwt, authorizeRole(['STUDENT_ROLE'])], deleteUser)

api.put('/update/:id', [validateJwt, updateValidator, authorizeRole(['STUDENT_ROLE'])], putUser)




//Exporto las rutas
export default api