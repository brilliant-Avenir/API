import express from 'express';
import verifyToken from '../auth.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { OutboxModel } from "../../models/Staffs/Outbox.js"

const outboxRoutes = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./src/Files/Outbox");
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
  }
});

const upload = multer({ storage: fileStorage });

outboxRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await OutboxModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

outboxRoutes.get("/:outboxId", verifyToken, async (req, res) => {
  try {
    const result = await OutboxModel.findById(req.params.outboxId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

outboxRoutes.post("/", verifyToken, upload.single("content"), async (req, res) => {
    const outbox = new OutboxModel({
      _id: new mongoose.Types.ObjectId(),
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      date: req.body.date,
      content: { data: req.file.filename },
      teacher: req.body.teacher
    });  
    try {
      const result = await outbox.save();
      res.status(201).json({
        createdOutbox: {
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

outboxRoutes.put("/:outboxId", verifyToken, upload.single("content"), async(req, res) => {
  try {
    const staff = req.params.outboxId;
    const updatedData = req.body;
    const options = { new: true };

    const result = await StaffsModel.findByIdAndUpdate(
    {  _id: staff }, updatedData, options
    )
    res.status(200).json(result);
      console.log(result);
    }
    catch (error) {
      console.log(error);
    res.status(400).json({ message: error.message });
      }
});

export default outboxRoutes;