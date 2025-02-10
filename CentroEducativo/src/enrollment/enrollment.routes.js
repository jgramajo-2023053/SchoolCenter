import { Router } from "express"
import { 
    enrollStudent,
    getStudentCourses
} from "./enrollment.controller.js"
import { validateJwt, authorizeRole } from '../../middlewares/validate.jwt.js'


const api = Router()

api.post('/register', [validateJwt, authorizeRole(['STUDENT_ROLE'])], enrollStudent)

api.get('/getcurses/:id', [validateJwt, authorizeRole(['STUDENT_ROLE'])], getStudentCourses)

//Exporto las rutas
export default api