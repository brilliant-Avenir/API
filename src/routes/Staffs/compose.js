import express from 'express';
import { ComposeModel } from "../../models/Staffs/Compose.js"
import { verifyToken } from '../auth.js';
import mongoose from 'mongoose';

const composeRoutes = express.Router();

composeRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await ComposeModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

composeRoutes.get("/:composeId", verifyToken, async (req, res) => {
  try {
    const result = await ComposeModel.findById(req.params.composeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

composeRoutes.post("/", verifyToken, async (req, res) => {
    const compose = new ComposeModel({
      _id: new mongoose.Types.ObjectId(),
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      date: req.body.date,
      content: req.body.content,
      teacher: req.body.teacher
    });  
    try {
      const result = await compose.save();
      res.status(201).json({
        createdCompose: {
            from: result.from,
            to: result.to,
            subject: result.subject,
            date: result.date,
            content: result.content,
            teacher: result.teacher,
            _id: result._id
        },
      });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default composeRoutes;