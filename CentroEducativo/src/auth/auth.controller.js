import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

//Register Student
export const registerS = async(req, res)=>{
    try{    
        let data = req.body
        let user = new User(data)

        user.password = await encrypt(user.password)

        user.role = 'STUDENT_ROLE'

        await user.save()
        return res.send({message: `Registered successfully, can be login with email: ${user.email}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with user registration', err})
    }
}

//Register Teacher
export const registerT = async(req, res)=>{
    try{    
        let data = req.body
        let user = new User(data)

        user.password = await encrypt(user.password)

        user.role = 'TEACHER_ROLE'

        await user.save()
        return res.send({message: `Registered successfully, can be login with email: ${user.email}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with user registration', err})
    }
}

// la unica diferencia real entre ambos register es cual rol tienen por defecto

//Login
export const login = async(req, res)=>{
    try{

        let { email, password } = req.body
        let user = await User.findOne({email: email})
        
        if(user && await checkPassword(user.password, password)){
            //Generar el token
            let loggedUser = {
                uid: user._id,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}