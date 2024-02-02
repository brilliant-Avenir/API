import express from 'express';
import { verifyToken } from '../Students/auth.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { NewslettersModel } from "../../models/Students/Newsletter.js"

const newsletterRoutes = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/Files/Informations");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const upload = multer({ storage: fileStorage });

newsletterRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await NewslettersModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

newsletterRoutes.get("/:newsletterid", verifyToken, async (req, res) => {
    try {
      const result = await NewslettersModel.findById(req.params.newsletterid);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

newsletterRoutes.post("/", verifyToken, upload.single("file"), async (req, res) => {
    const newsletters = new NewslettersModel({
        _id: new mongoose.Types.ObjectId(),
        subject: req.body.subject,
        class: req.body.class,
        file: { data: req.file.filename },
        staff: req.body.staff,
    });
    try {
        const result = await newsletters.save();
        res.status(201).json({
            createdNewsletters: {
                subject: result.subject,
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

newsletterRoutes.put("/:newsletterid", verifyToken, upload.single("file"), async(req, res) => {
    try {
        const newsletter = req.params.newsletterid;
        const updatedData = req.body;
        const options = { new: true };

        const result = await NewslettersModel.findByIdAndUpdate(
            { _id: newsletter }, updatedData, options
        )
        res.status(200).json(result);
        console.log(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default newsletterRoutes;