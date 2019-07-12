const express = require('express');
const router = express.Router();
const { list, show, getLastClass, create, update, remove } = require("../controllers/ClassDataController");
const { listStudents, showStudent, createStudent, updateStudent, removeStudent } = require("../controllers/StudentDataController");

router.get("/api/classdata", list);
router.get("/api/classdata/:id", show);
router.get("/api/classdata/lastclass/:id", getLastClass)
router.post("/api/classdata", create);
router.put("/api/classdata/:id", update);
router.delete("/api/classdata/:id", remove);


// student data routes
router.get("/api/classdata/:id/studentdata", listStudents);
router.get("/api/classdata/:id/studentdata/:id", showStudent);
// router.get("/api/classdata/lastclass/:id", getLastClass)
router.post("/api/classdata/:id/studentdata", createStudent);
router.put("/api/classdata/:id/studentdata/:id", updateStudent);
router.delete("/api/classdata/:id/studentdata/:id", removeStudent);


module.exports = router;