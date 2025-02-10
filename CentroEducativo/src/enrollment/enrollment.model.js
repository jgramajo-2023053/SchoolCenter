import { Schema, model } from "mongoose";

const enrollmentSchema = Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Curse",
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    }
});

export default model("Enrollment", enrollmentSchema);