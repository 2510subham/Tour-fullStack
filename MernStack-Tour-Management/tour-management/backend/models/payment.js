import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        tour: {
            type: mongoose.Types.ObjectId,
            ref: "Tour",
        },
        amount: {
            type: Number,
            required: true,
        },
        booking: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "pending",
        },
    },
    { timestamps: true }
);
export default mongoose.model("Payment", paymentSchema);
