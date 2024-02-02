import mongoose from "mongoose";

const ComposeSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    content: {
        data: Buffer,
        contentType: String
    },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true }

});

export const ComposeModel = mongoose.model("compose", ComposeSchema);