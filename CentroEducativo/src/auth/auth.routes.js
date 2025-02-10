import { Router } from "express"
import { 
    login,
    registerS,
    registerT, 
} from "./auth.controller.js"
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { registerValidator } from "../../middlewares/validators.js"


const api = Router()

//Register Student
api.post(
    '/register/student', 
    [
        registerValidator,
    ], 
    registerS
)

//Register Teacher
api.post(
    '/register/teacher', 
    [
        registerValidator,
    ], 
    registerT
)

api.post('/login', login)


//Exporto las rutas
export default api