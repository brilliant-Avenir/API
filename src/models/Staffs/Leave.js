import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
    type: { type: String, required: true },
    subject: { type: String, required: true },
    starts_from: { type: Date, required: true },
    ends_in: { type: Date, required: true },
    reason: { type: String, required: true },
    attach_file: { 
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
        }
    },
    status: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true }
});

export const LeaveModel = mongoose.model("leave", LeaveSchema);