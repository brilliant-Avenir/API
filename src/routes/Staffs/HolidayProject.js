import express from 'express';
import { verifyToken } from '../auth.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { HolidayProjectModel } from "../../models/Staffs/HolidayProject.js";

const holidayProjectRoutes = express.Router();

express().use(express.static('./src/Files'));
express().use(express.urlencoded({extended: false}));
express().set('view engine', 'ejs');

/* const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./src/Files/HProjects");
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
}); */

const store = multer.memoryStorage();

const upload = multer({ storage: store });

holidayProjectRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await HolidayProjectModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

holidayProjectRoutes.get("/:holidayProjectId", verifyToken, async (req, res) => {
  try {
    const result = await HolidayProjectModel.findById(req.params.holidayProjectId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

holidayProjectRoutes.post("/", verifyToken, upload.single("attach_file"), async (req, res) => {
    const holidayProject = new HolidayProjectModel({
      _id: new mongoose.Types.ObjectId(),
      subject: req.body.subject,
      class: req.body.class,
      time: req.body.time,
      attach_file: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      } /* { data: fs.readFileSync("./src/Files/Assignment/" + req.file.filename) } */,
      teacher: req.body.teacher,
      title: req.body.title,
      date: req.body.date
    });
    try {
      const result = await holidayProject.save();
      res.status(201).json({
        createdholidayProject: {
          subject: result.subject,
          class: result.class,
          time: result.time,
          title: result.title,
          date: result.date,
          attach_file: result. attach_file,
          teacher: result.teacher,
          _id: result._id
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

holidayProjectRoutes.put("/:holidayProjectid", verifyToken, upload.single("attach_file"), async(req, res) => {
  try {
      const holidayProject = req.params.holidayProjectid;
      const updatedData = req.body;
      const options = { new: true };

      const result = await HolidayProjectModel.findByIdAndUpdate(
          { _id: holidayProject }, updatedData, options
      )
      res.status(200).json(result);
      console.log(result);
  }
  catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
  }
});

export default holidayProjectRoutes;