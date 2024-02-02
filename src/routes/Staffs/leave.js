import express from 'express';
import { LeaveModel } from "../../models/Staffs/Leave.js"
import { verifyToken } from '../auth.js';
import mongoose from 'mongoose';

const leaveRoutes = express.Router();

leaveRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await LeaveModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

leaveRoutes.get("/:leaveId", verifyToken, async (req, res) => {
  try {
    const result = await LeaveModel.findById(req.params.leaveId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

leaveRoutes.post("/", verifyToken, async (req, res) => {
    const leave = new LeaveModel({
      _id: new mongoose.Types.ObjectId(),
      type: req.body.type,
      subject: req.body.subject,
      starts_from: req.body.start_from,
      ends_in: req.body.ends_in,
      reason: req.body.reason,
      attach_file: req.body.attach_file,
      status: req.body.status,
      teacher: req.body.teacher
    });  
    try {
      const result = await leave.save();
      res.status(201).json({
        createdLeave: {
            type: result.type,
            subject: result.subject,
            starts_from: result.start_from,
            ends_in: result.ends_in,
            reason: result.reason,
            attach_file: result.attach_file,
            status: result.status,
            teacher: result.teacher,
            _id: result._id
        },
      });
    } catch (err) {
          res.status(500).json(err);
    }
});

export default leaveRoutes;