import { Router } from "express";
import { instance } from "../index.js";
import payment from "../models/payment.js";
const router = Router();

router.post("/", async (req, res) => {
    try {
        //tour id,user id,price,booking date,anme,phone,guest size
        console.log(req.body);
        const pay = new payment({ user: req.body.user._id, booking: req.body.booking._id, amount: req.body.amount * 81.01, tour: req.body.tourName });
        await pay.save();
        const data = await instance.paymentLink.create({
            amount: req.body.amount,
            currency: "INR",
            accept_partial: false,
            first_min_partial_amount: req.body.amount,
            description: `Tour Booking ${req.body.booking.tourName}`,
            customer: {
                name: req.body.user.Eusername,
                email: req.body.user.email,
                contacst: `+91${req.body.booking.phone}`
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            notes: {
                policy_name: `Tour Booking ${req.body.booking.tourName}`
            }
        })
        console.log(data);
        res.status(200).json({ success: true, message: "Payment created successfully", data: data });
    }
    catch (err) {
        res.status(404).json({ success: false, message: "Payment not created ", error: err });
    }
})

export default router;