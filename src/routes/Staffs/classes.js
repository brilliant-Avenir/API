import express from 'express';
import { verifyToken } from '../auth.js';
import mongoose from 'mongoose';
import { ClassesModel } from "../../models/Staffs/Classes.js";

const classesRoutes = express.Router();

classesRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await ClassesModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

classesRoutes.get("/:classId", verifyToken, async (req, res) => {
    try {
      const result = await ClassesModel.findById(req.params.classId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

classesRoutes.post("/", verifyToken, async (req, res) => {
    const classes = new ClassesModel({
        _id: new mongoose.Types.ObjectId(),
        classname: req.body.classname,
        teacher: req.body.teacher,
        no_of_pupils: req.body.no_of_pupils,
        subjectName: req.body.subjectName,
        subjectName1: req.body.subjectName1,
        subjectName2: req.body.subjectName2,
        subjectName3: req.body.subjectName3,
        subjectName4: req.body.subjectName4,
        subjectName5: req.body.subjectName5,
        subjectName6: req.body.subjectName6,
        subjectName7: req.body.subjectName7,
        subjectName8: req.body.subjectName8,
        subjectName9: req.body.subjectName9,
        subjectName10: req.body.subjectName10,
        subjectName11: req.body.subjectName11,
        subjectName12: req.body.subjectName12,
        subjectName13: req.body.subjectName13,
        subjectName14: req.body.subjectName14,
        subjectName15: req.body.subjectName15,
        subjectName16: req.body.subjectName16,
        subjectName17: req.body.subjectName17,
        subjectName18: req.body.subjectName18,
        subjectName19: req.body.subjectName19,
        subjectName20: req.body.subjectName20
    });
    try {
        const result = await classes.save();
        res.status(201).json({
            createdClasses: {
                classname: result.classname,
                teacher: result.teacher,
                no_of_pupils: result.no_of_pupils,
                subjectName: result.subjectName,
                subjectName1: result.subjectName1,
                subjectName2: result.subjectName2,
                subjectName3: result.subjectName3,
                subjectName4: result.subjectName4,
                subjectName5: result.subjectName5,
                subjectName6: result.subjectName6,
                subjectName7: result.subjectName7,
                subjectName8: result.subjectName8,
                subjectName9: result.subjectName9,
                subjectName10: result.subjectName10,
                subjectName11: result.subjectName11,
                subjectName12: result.subjectName12,
                subjectName13: result.subjectName13,
                subjectName14: result.subjectName14,
                subjectName15: result.subjectName15,
                subjectName16: result.subjectName16,
                subjectName17: result.subjectName17,
                subjectName18: result.subjectName18,
                subjectName19: result.subjectName19,
                subjectName20: result.subjectName20,
                _id: result._id
            }
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

classesRoutes.patch("/:classid", verifyToken, async(req, res) => {
    try {
        const aclass = req.params.classid;
        const updatedData = req.body;
        const options = { new: true };

        const result = await ClassesModel.findByIdAndUpdate(
            aclass, updatedData, options
        )
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default classesRoutes;