import express from 'express';
import { HolidayModel } from "../../models/Staffs/Holidays.js";
import { verifyToken } from '../auth.js';
import mongoose from 'mongoose';

const holidayRoutes = express.Router();

holidayRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await HolidayModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

holidayRoutes.get("/:holidayId", verifyToken, async (req, res) => {
  try {
    const result = await HolidayModel.findById(req.params.holidayId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

holidayRoutes.post("/", verifyToken, async (req, res) => {
    const holiday = new HolidayModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      duration: req.body.duration,
      date: req.body.date,
      teacher: req.body.teacher
    });  
    try {
      const result = await holiday.save();
      res.status(201).json({
        createdHoliday: {
            name: result.name,
            duration: result.duration,
            date: result.date,
            teacher: result.teacher,
            _id: result._id
        },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default holidayRoutes;