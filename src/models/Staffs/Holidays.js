import mongoose from "mongoose";

const HolidaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: Date, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true }
});

export const HolidayModel = mongoose.model("holiday", HolidaySchema);