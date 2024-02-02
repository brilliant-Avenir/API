import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    class: { type: String, required: true },
    time: { type: String, required: true },
    title: { type: String, required: true},
    date: { type: String, required: true},
    attach_file: {
        data: Buffer,
        contentType: String
    },
    teacher: { type: String, required: true }
});

export const AssignmentModel = mongoose.model("assignment", AssignmentSchema);