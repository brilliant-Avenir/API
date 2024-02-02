import { Binary } from "mongodb";
import mongoose from "mongoose";

const pupilsSchema = new mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    othername: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    profile_pic: {
        data: Buffer,
        contentType: String
    },
    address: { type: String, required: true},
    gender: { type: String, required: true},
    date_of_birth: { type: String},
    religion: { type: String, required: true},
    blood_group: { type: String, required: true},
    state: { type: String, required: true},
    lga: {type: String, required: true},
    class: { type: String, required: true },
    emergency_contact_name: { type: String, required: true},
    emergency_contact_address: { type: String, required: true},
    emergency_contact_email: { type: String, required: true},
    emergency_contact_phone: { type: Number, required: true},
    emergency_contact_relationship: { type: String, required: true}
});

export const PupilsModel = mongoose.model("pupils", pupilsSchema);