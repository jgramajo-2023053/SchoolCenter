import { Schema, model} from 'mongoose'

const curseSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        teacherId: {
            type: Schema.Types.ObjectId,
            ref: "User", // Referencia al modelo User (profesor)
            required: true
        },
        students: [{
            type: Schema.Types.ObjectId,
            ref: "User" // Referencia al modelo User (alumnos)
        }]
    }
)

export default model('Curse', curseSchema)