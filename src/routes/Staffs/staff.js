import express from 'express';
import { verifyToken } from './auth.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { StaffsModel } from "../../models/Staffs/Staffs.js"

const staffsRoutes = express.Router();

express().use(express.static('./src/Files'));
express().use(express.urlencoded({extended: false}));
express().set('view engine', 'ejs')

/* const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/Files/SImages");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
}); */

const store = multer.memoryStorage();

const upload = multer({ storage: store });

staffsRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await StaffsModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

staffsRoutes.get("/:staffId", verifyToken, async (req, res) => {
    try {
      const result = await StaffsModel.findById(req.params.staffId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

staffsRoutes.post("/", verifyToken, upload.single("image"), async (req, res) => {
    const staffs = new StaffsModel({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othername: req.body.othername,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        address: req.body.address,
        image: { 
            data: req.file.buffer,
            contentType: req.file.mimetype 
        },
        phone: req.body.phone,
        gender: req.body. gender,
        date_of_birth: req.body.date_of_birth,
        religion: req.body.religion,
        marital_status: req.body.marital_status,
        blood_group: req.body.blood_group,
        state: req.body.state,
        class1: req.body.class1,
        class2: req.body.class2,
        class3: req.body.class3,
        class4: req.body.class4,
        class5: req.body.class5,
        emergency_contact_person_name: req.body.emergency_contact_person_name,
        emergency_contact_address: req.body.emergency_contact_address,
        emergency_contact_email: req.body.emergency_contact_email,
        emergency_contact_phone: req.body.emergency_contact_phone,
        emergency_contact_relationship: req.body.emergency_contact_relationship
    });
    try {
        const result = await staffs.save();
        res.status(201).json({
            createdStaff: {
                firstname: result.firstname,
                lastname: result.lastname,
                othername: result.othername,
                username: result.username,
                email: result.email,
                role: result.role,
                password: result.password,
                phone: result.time,
                address: result.address,
                gender: result. gender,
                date_of_birth: result.date_of_birth,
                religion: result.religion,
                marital_status: result.marital_status,
                blood_group: result.blood_group,
                image: result.image,
                state: result.state,
                class1: result.class1,
                class2: result.class2,
                class3: result.class3,
                class4: result.class4,
                class5: result.class5,
                emergency_contact_person_name: result.emergency_contact_person_name,
                emergency_contact_address: result.emergency_contact_address,
                emergency_contact_email: result.emergency_contact_email,
                emergency_contact_phone: result.emergency_contact_phone,
                emergency_contact_relationship: result.emergency_contact_relationship,
                _id: result._id
            }
        });
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

staffsRoutes.put("/:staffid", verifyToken, upload.single("image"), async(req, res) => {
    try {
        const staff = req.params.staffid;
        const updatedData = req.body;
        const options = { new: true };

        const result = await StaffsModel.findByIdAndUpdate(
            { _id: staff }, updatedData, options
        )
        res.status(200).json(result);
        console.log(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default staffsRoutes;