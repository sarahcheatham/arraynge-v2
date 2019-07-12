const ClassDataModel = require("../models/ClassDataModel");
const StudentModel = require("../models/StudentModel");

module.exports.listStudents = (req, res) => {
    ClassDataModel.find({ userId: req.user._id }).exec().then(students => {
        return res.json(students)
    })
}

// module.exports.getLastClass = (req, res) => {
//     ClassDataModel.find({ userId: req.user._id }).exec()
//     .then((lastClass, err) => {
//         if(err) return res.status(500).send(err);
//         if(lastClass[lastClass.length - 1] === undefined){
//             return res.json({})
//         }
//         return res.json(lastClass[lastClass.length - 1]);
//     });
// }


module.exports.showStudent = (req, res)=>{
    StudentModel.findById(req.params.id).exec().then(student =>{
        return res.json(student)
    })
}

module.exports.createStudent = (req, res)=>{
    const s = new StudentModel({
        name: req.body.name,
        gradelevel: req.body.gradelevel,
        subject: req.body.subject,
        score: req.body.score
    });
    s.save().then(savedStudent =>{
        return res.json(savedStudent)
    })
}

module.exports.updateStudent = (req, res)=>{
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