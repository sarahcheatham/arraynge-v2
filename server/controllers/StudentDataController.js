const ClassDataModel = require("../models/ClassDataModel");
const StudentModel = require("../models/StudentModel");

module.exports.listStudents = (req, res) => {
    req.body.students.map(student => {
        StudentModel.find({ classId: student.classId }).exec().then(students => {
            return res.json(students)
        })
    })
}

module.exports.showStudent = (req, res)=>{
    req.body.students.map(oneStudent => {
        StudentModel.findById(req.params.id).exec().then(student =>{
            return res.json(student)
        })
    })
}

module.exports.createStudent = (req, res)=>{
    req.body.students.map((student, index)=> {
        const s = new StudentModel({
            classId: student.classId,
            name: student.name,
            gradelevel: student.gradelevel,
            subject: student.subject,
            score: student.score
        });
        s.save().then(savedStudent =>{
            return res.json(savedStudent)
        })
    })
}

module.exports.updateStudent = (req, res)=>{
    console.log(req.body.students)
    StudentModel.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true},
        (err, studentUpdate)=>{
            if(err) return res.status(500).send(err);
            return res.send(studentUpdate)
        }
    )
}

module.exports.removeStudent = (req, res)=>{
    StudentModel.findByIdAndRemove(req.params.id, (err, student)=>{
        if(err) return res.status(500).send(err)

        //creating a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "Student successfully deleted",
            id: student._id
        }
        return res.status(200).send(response);
    });
}