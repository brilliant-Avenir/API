import mongoose from "mongoose";

const InboxSchema = new mongoose.Schema({
    from: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    content: {
        data: Buffer,
        contentType: String
    },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true }
});

export const InboxModel = mongoose.model("inbox", InboxSchema);