import { Schema, model } from 'mongoose'

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true]
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `Can't be overcome 100 characters`],
        },
        role: {
            type: String,
            uppercase: true,
            enum: ['TEACHER_ROLE', 'STUDENT_ROLE']
        }
    }
)

userSchema.methods.toJSON = function(){
    const { __v, password, ...user} = this.toObject()
    return user
}

//Crear y exportar el modelo
export default model('User', userSchema)