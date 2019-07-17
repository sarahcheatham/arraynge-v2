const express = require('express');
const router = express.Router();
const { listStudents, showStudent, createStudent, updateStudent, removeStudent } = require("../controllers/StudentDataController");

router.get("/api/classdata/:id/studentdata", listStudents);
router.get("/api/classdata/:id/studentdata/:id", showStudent);
router.post("/api/classdata/:id/studentdata", createStudent);
router.put("/api/classdata/:id/studentdata/:id", updateStudent);
router.delete("/api/classdata/:id/studentdata/:id", removeStudent);

module.exports = router;