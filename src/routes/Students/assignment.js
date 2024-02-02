import express from 'express';
import { verifyToken } from '../Students/auth.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { AssignmentModel } from "../../models/Students/Assignment.js"

const assignment2Routes = express.Router();

express().use(express.static('./src/Files'));
express().use(express.urlencoded({extended: false}));
express().set('view engine', 'ejs')

/* const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./src/Files/Assignment2");
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
}); */

const store = multer.memoryStorage();

const upload = multer({ storage: store });

assignment2Routes.get('/',verifyToken, async (req, res) => {
        try {
            const result = await AssignmentModel.find({});
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
});

assignment2Routes.get("/:assignmentId", verifyToken, async (req, res) => {
  try {
    const result = await AssignmentModel.findById(req.params.assignmentId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

assignment2Routes.post("/", verifyToken, upload.single('attach_file'), async (req, res) => {
  const assignment = new AssignmentModel({
    _id: new mongoose.Types.ObjectId(),
    subject: req.body.subject,
    class: req.body.class,
    time: req.body.time,
    attach_file: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    } /* { data: fs.readFileSync("./src/Files/Assignment/" + req.file.filename) } */,
    student: req.body.student,
    title: req.body.title,
    date: req.body.date
  });
  try {
    const result = await assignment.save();
    res.status(201).json({
      createdAssignment: {
        subject: result.subject,
        class: result.class,
        time: result.time,
        title: result.title,
        date: result.date,
        attach_file: result. attach_file,
        student: result.student,
        _id: result._id
      },
    });
  } catch (err) {
      res.status(500).json(err);
  }
});

assignment2Routes.put("/:assignmentId", verifyToken, upload.single("attach_file"), async(req, res) => {
  try {
      const pupil = req.params.pupilid;
      const updatedData = req.body;
      const options = { new: true };

      const result = await PupilsModel.findOneAndUpdate(
          { _id: pupil }, updatedData, options
      )
      res.status(200).json(result);
      console.log(result);
  }
  catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
  }
});

export default assignment2Routes;