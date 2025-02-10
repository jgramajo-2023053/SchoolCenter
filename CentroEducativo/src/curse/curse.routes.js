import { Router } from "express"
import { 
    saveCurse,
    updateCurse,
    deleteCurse,
    getCurses 
} from "./curse.controller.js"
import { validateJwt, authorizeRole } from '../../middlewares/validate.jwt.js'


const api = Router()

api.post('/create', [validateJwt, authorizeRole(['TEACHER_ROLE'])], saveCurse)

api.delete('/delete/:id', [validateJwt, authorizeRole(['TEACHER_ROLE'])], deleteCurse)

api.put('/update/:id', [validateJwt, authorizeRole(['TEACHER_ROLE'])], updateCurse)

api.get('/get', [validateJwt, authorizeRole(['TEACHER_ROLE'])], getCurses)



//Exporto las rutas
export default api