import express from 'express';
import { verifyToken } from '../auth.js';
import mongoose from 'mongoose';
import { TutorialsModel } from "../../models/Staffs/Tutorials.js"

const tutorialsRoutes = express.Router();

tutorialsRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await TutorialsModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

tutorialsRoutes.get("/:tutorialId", verifyToken, async (req, res) => {
  try {
    const result = await TutorialsModel.findById(req.params.tutorialId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

tutorialsRoutes.post("/", verifyToken, async (req, res) => {
    const tutorials = new TutorialsModel({
      _id: new mongoose.Types.ObjectId(),
      subject: req.body.subject,
      class: req.body.class,
      title: req.body.title,
      file: req.body.file,
      time: req.body.time,
      score: req.body.score,
      attach_file: req.body.attach_file,
      teacher: req.body.teacher
    });  
    try {
      const result = await tutorials.save();
      res.status(201).json({
        createdTutorials: {
            subject: result.subject,
            class: result.class,
            title: result.title,
            file: result.file,
            time: result.time,
            score: result.score,
            attach_file: result.attach_file,
            teacher: result.teacher,
            _id: result._id
        },
      });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default tutorialsRoutes;