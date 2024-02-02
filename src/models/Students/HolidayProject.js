import mongoose from "mongoose";

const HolidayProjectSchema = new mongoose.Schema({
    term: { type: String, required: true },
    class: { type: String, required: true },
    attach_file: {
        data: Buffer,
        contentType: String,
    },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true }
});

export const HolidayProjectModel = mongoose.model("HProject", HolidayProjectSchema);