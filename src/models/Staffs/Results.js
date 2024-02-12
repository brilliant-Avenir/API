import mongoose from "mongoose";

const ResultsSchema = new mongoose.Schema({
    pupil: { type: String, required: true},
    term: { type: String, required: true },
    class: { type: String, required: true },
    file: {
        data: Buffer,
        contentType: String
    },
    staff: { type: String, required: true }
});

export const ResultsModel = mongoose.model("results", ResultsSchema);
