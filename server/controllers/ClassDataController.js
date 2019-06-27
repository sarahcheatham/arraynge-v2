const ClassDataModel = require("../models/ClassDataModel");

module.exports.list = (req, res) => {
    ClassDataModel.find({ userId: req.user._id }).exec().then(allClasses => {
        return res.json(allClasses)
    })
}

module.exports.getLastClass = (req, res) => {
    ClassDataModel.find({ userId: req.user._id }).exec()
    .then((lastClass, err) => {
        if(err) return res.status(500).send(err);
        console.log("lastClass:", lastClass[lastClass.length - 1])
        return res.json(lastClass[lastClass.length - 1]);
    });
}


module.exports.show = (req, res)=>{
    ClassDataModel.findById(req.params.id).exec().then(oneClass =>{
        return res.json(oneClass)
    })
}

module.exports.create = (req, res)=>{
    const c = new ClassDataModel({
        userId: req.body.userId,
        gradelevel: req.body.gradelevel,
        subject: req.body.subject,
        year: req.body.year,
        students: req.body.students
    });
    c.save().then(savedClass =>{
        return res.json(savedClass)
    })
}

module.exports.update = (req, res)=>{
    ClassDataModel.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true},
        (err, dataUpdate)=>{
            if(err) return res.status(500).send(err);
            return res.send(dataUpdate)
        }
    )
}

module.exports.remove = (req, res)=>{
    ClassDataModel.findByIdAndRemove(req.params.id, (err, classdata)=>{
        if(err) return res.status(500).send(err)

        //creating a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "Student successfully deleted",
            id: classdata._id
        }
        return res.status(200).send(response);
    });
}