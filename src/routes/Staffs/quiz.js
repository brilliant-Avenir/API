import express from 'express';
import { verifyToken } from '../auth.js';
import mongoose from 'mongoose';
import { QuizModel } from "../../models/Staffs/Quiz.js"

const quizRoutes = express.Router();

quizRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await QuizModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

quizRoutes.get("/:quizId", verifyToken, async (req, res) => {
  try {
    const result = await QuizModel.findById(req.params.quizId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

quizRoutes.post("/", verifyToken, async (req, res) => {
    const quiz = new QuizModel({
      _id: new mongoose.Types.ObjectId(),
      subject: req.body.subject,
      type: req.body.type,
      start_date: req.body.start_date,
      close_date: req.body.close_date,
      start_time: req.body.start_time,
      close_time: req.body.close_time,
      title: req.body.title,
      attach_file: req.body.attach_file,
      duration: req.body.duration,
      teacher: req.body.teacher
    });  
    try {
      const result = await quiz.save();
      res.status(201).json({
        createdQuiz: {
            subject: result.subject,
            type: result.type,
            start_date: result.start_date,
            close_date: result.close_date,
            start_time: result.start_time,
            close_time: result.close_time,
            title: result.title,
            attach_file: result.attach_file,
            duration: result.duration,
            teacher: result.teacher,
            _id: result._id
        },
      });
    } catch (err) {
          res.status(500).json(err);
    }
  });

export default quizRoutes;