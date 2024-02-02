import express from 'express';
import { verifyToken } from '../Students/auth.js';
import mongoose from 'mongoose';
import multer from "multer";
import { PupilsModel } from "../../models/Students/Pupils.js"

const pupilsRoutes = express.Router();

express().use(express.static('./src/Files'));
express().use(express.urlencoded({extended: false}));
express().set('view engine', 'ejs')

/* const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/Files/PImages");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
}); */

const store = multer.memoryStorage();

const upload = multer({ storage: store });

pupilsRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await PupilsModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

pupilsRoutes.get("/:pupilid", verifyToken, async (req, res) => {
    try {
      const result = await PupilsModel.findById(req.params.pupilid);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

pupilsRoutes.post("/", verifyToken, upload.single("profile_pic"), async (req, res) => {
    const pupils = new PupilsModel({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othername: req.body.othername,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        profile_pic: { 
            data: req.file.buffer,
            contentType: req.file.mimetype
         },
        gender: req.body. gender,
        date_of_birth: req.body.date_of_birth,
        religion: req.body.religion,
        blood_group: req.body.blood_group,
        state: req.body.state,
        lga: req.body.lga,
        class: req.body.class,
        emergency_contact_name: req.body.emergency_contact_name,
        emergency_contact_address: req.body.emergency_contact_address ,
        emergency_contact_email: req.body.emergency_contact_email,
        emergency_contact_phone: req.body.emergency_contact_phone,
        emergency_contact_relationship: req.body.emergency_contact_relationship,
    });
    try {
        const result = await pupils.save();
        res.status(201).json({
            createdPupils: {
                firstname: result.firstname,
                lastname: result.lastname,
                othername: result.othername,
                username: result.username,
                email: result.email,
                password: result.password,
                address: result.address,
                profile_pic: result.profile_pic,
                gender: result. gender,
                date_of_birth: result.date_of_birth,
                religion: result.religion,
                blood_group: result.blood_group,
                state: result.state,
                lga: result.lga,
                class: result.class,
                emergency_contact_name: result.emergency_contact_name,
                emergency_contact_address: result.emergency_contact_address ,
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

pupilsRoutes.put("/:pupilid", verifyToken, upload.single("profile_pic"), async(req, res) => {
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

export default pupilsRoutes;