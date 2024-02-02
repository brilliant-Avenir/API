import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    type: { type: String, required: true },
    start_date: { type: Date, required: true },
    close_date: { type: Date, required: true },
    start_time: { type: Date, required: true },
    close_time: { type: Date, required: true },
    title: { type: String, required: true },
    attach_file: { 
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
        }
    },
    duration: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true }
});

export const QuizModel = mongoose.model("quiz", QuizSchema);