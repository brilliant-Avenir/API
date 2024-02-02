import mongoose from "mongoose";

const staffsSchema = new mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    othername: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    role: { type: String, required: true },
    password: { type: String, required: true, unique: true},
    phone: { type: Number, required: true, unique: true},
    address: { type: String, required: true},
    gender: { type: String, required: true},
    date_of_birth: { type: String, required: true},
    religion: { type: String, required: true},
    marital_status: { type: String, required: true},
    blood_group: { type: String, required: true},
    image: {
        data: Buffer,
        contentType: String
    },
    state: { type: String, required: true},
    class1: { type: String, required: true},
    class2: { type: String, required: true},
    class3: { type: String, required: true},
    class4: { type: String, required: true},
    class5: { type: String, required: true},
    emergency_contact_person_name: { type: String, required: true},
    emergency_contact_address: { type: String, required: true},
    emergency_contact_email: { type: String, required: true},
    emergency_contact_phone: { type: Number, required: true},
    emergency_contact_relationship: { type: String, required: true}
});

export const StaffsModel = mongoose.model("staffs", staffsSchema);