import mongoose from "mongoose";

const BillsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    class: { type: String, required: true },
    year: { type: String, required: true },
    term: { type: String, required: true },
    amount: { type: String, required: true },
    invoice_file: {
        data: Buffer,
        contentType: String,
    },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "staffs", required: true }
});

export const BillsModel = mongoose.model("bills", BillsSchema);