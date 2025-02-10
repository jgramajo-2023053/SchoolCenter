import Enrollment from "./enrollment.model.js";
import Curse from "../curse/curse.model.js";
import User from "../user/user.model.js";

export const enrollStudent = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        // Verificar que el usuario exista y sea un estudiante
        const student = await User.findById(studentId);
        if (!student || student.role !== "STUDENT_ROLE") {
            return res.status(400).send({ message: "Invalid student ID or role" });
        }

        // Verificar que el curso exista
        const course = await Curse.findById(courseId);
        if (!course) {
            return res.status(400).send({ message: "Invalid course ID" });
        }

        // Verificar si ya está inscrito
        const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).send({ message: "Student is already enrolled in this course" });
        }

        const enrolledCourses = await Curse.find({ students: studentId });

        // Si ya está inscrito en 3 cursos, no permitir la inscripción
        if (enrolledCourses.length >= 3) {
            return res.status(400).send({ message: "Student has already enrolled in the maximum of 3 courses" });
        }

        // Crear la inscripción
        const enrollment = new Enrollment({ student: studentId, course: courseId });
        await enrollment.save();

        // Agregar al estudiante en la lista de estudiantes del curso
        await Curse.findByIdAndUpdate(courseId, { $push: { students: studentId } });

        return res.status(201).send({ message: "Student enrolled successfully", enrollment });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error enrolling student", err });
    }
}; 

export const getStudentCourses = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del estudiante desde el token

        // Verificar que el usuario exista y sea un estudiante
        const student = await User.findById(id);
        if (!student) {
            return res.status(403).send({ message: "Student not found" });
        }

        // Buscar los cursos en los que está inscrito
        const courses = await Curse.find({ students: id }).populate("teacherId", "name email");

        return res.status(200).send({ message: "Courses found", courses });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error retrieving courses", err });
    }
};

