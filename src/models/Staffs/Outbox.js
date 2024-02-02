import mongoose from "mongoose";

const OutboxSchema = new mongoose.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    content: {
        data: Buffer,
        contentType: String
    },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true }
});

export const OutboxModel = mongoose.model("outbox", OutboxSchema);