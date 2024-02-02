import mongoose from "mongoose";

const NewslettersSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    class: { type: String, required: true },
    file: {
        data: Buffer,
        contentType: String,
    },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true }
});
 
export const NewslettersModel = mongoose.model("newsletters", NewslettersSchema);