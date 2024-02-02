import express from 'express';
import { verifyToken } from '../Students/auth.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { BillsModel } from "../../models/Students/Bills.js"

const billsRoutes = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/Files/Images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const upload = multer({ storage: fileStorage });

billsRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await BillsModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

billsRoutes.get("/:billid", verifyToken, async (req, res) => {
    try {
      const result = await BillsModel.findById(req.params.billid);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

billsRoutes.post("/", verifyToken, upload.single("invoice_file"), async (req, res) => {
    const bills = new BillsModel({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        class: req.body.class,
        year: req.body.year,
        term: req.body.term,
        amount: req.body.amount,
        invoice_file: { data: req.file.filename },
        staff: req.body.staff,
    });
    try {
        const result = await bills.save();
        res.status(201).json({
            createdBills: {
                title: result.title,
                class: result.class,
                year: result.year,
                term: result.term,
                amount: result.amount,
                invoice_file: result.invoice_file,
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

billsRoutes.put("/:billid", verifyToken, upload.single("invoice_file"), async(req, res) => {
    try {
        const bill = req.params.billid;
        const updatedData = req.body;
        const options = { new: true };

        const result = await BillsModel.findByIdAndUpdate(
            { _id: bill }, updatedData, options
        )
        res.status(200).json(result);
        console.log(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default billsRoutes;