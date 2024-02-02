import express from 'express';
import { InboxModel } from "../../models/Staffs/Inbox.js"
import { verifyToken } from '../auth.js';
import mongoose from 'mongoose';
import multer from 'multer';

const inboxRoutes = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./src/Files/Outbox");
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
  }
});

const upload = multer({ storage: fileStorage });

inboxRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await InboxModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

inboxRoutes.get("/:inboxId", verifyToken, async (req, res) => {
  try {
    const result = await InboxModel.findById(req.params.inboxId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

inboxRoutes.post("/", verifyToken, upload.single("content"), async (req, res) => {
    const inbox = new InboxModel({
      _id: new mongoose.Types.ObjectId(),
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      date: req.body.date,
      content: { data: req.file.filename },
      teacher: req.body.teacher
    });  
    try {
      const result = await inbox.save();
      res.status(201).json({
        createdInbox: {
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

inboxRoutes.put("/:inboxId", verifyToken, upload.single("content"), async(req, res) => {
  try {
    const inbox = req.params.inboxid;
    const updatedData = req.body;
    const options = { new: true };

    const result = await StaffsModel.findByIdAndUpdate(
    {  _id: inbox }, updatedData, options
    )
    res.status(200).json(result);
      console.log(result);
    }
    catch (error) {
      console.log(error);
    res.status(400).json({ message: error.message });
      }
});

export default inboxRoutes;