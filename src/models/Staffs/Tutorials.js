import mongoose from "mongoose";

const TutorialsSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    class: { type: String, required: true },
    title: { type: String, required: true },
    file: { type: String, required: true },
    time: { type: String, required: true },
    score: { type: String, required: true },
    attach_file: { 
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
        }, 
    
    },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true }
});

export const TutorialsModel = mongoose.model("tutorials", TutorialsSchema);