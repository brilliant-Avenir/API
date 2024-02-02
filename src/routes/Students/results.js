import express from 'express';
import { verifyToken } from '../Students/auth.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { ResultsModel } from '../../models/Students/Results.js';

const resultsRoutes = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/Files/Results");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: fileStorage });

resultsRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await ResultsModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

resultsRoutes.get("/:resultid", verifyToken, async (req, res) => {
    try {
      const result = await ResultsModel.findById(req.params.resultid);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

resultsRoutes.post("/", verifyToken, upload.single("file"), async (req, res) => {
    const results = new ResultsModel({
        _id: new mongoose.Types.ObjectId(),
        pupil: req.body.pupil,
        term: req.body.term,
        class: req.body.class,
        file: { data: req.file.filename },
        staff: req.body.staff,
    });
    try {
        const result = await results.save();
        res.status(201).json({
            createdresults: {
                pupil: result.pupil,
                term: result.term,
                class: result.class,
                file: result.file,
                staff: result.staff,
                _id: result._id
            }
        });
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

resultsRoutes.put("/:resultid", verifyToken, upload.single("file"), async(req, res) => {
    try {
        const ress = req.params.resultid;
        const updatedData = req.body;
        const options = { new: true };

        const result = await ResultsModel.findByIdAndUpdate(
            { _id: ress }, updatedData, options
        )
        res.status(200).json(result);
        console.log(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default resultsRoutes;