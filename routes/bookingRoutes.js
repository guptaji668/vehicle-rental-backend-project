import { Router } from "express";
import { BookingController } from "../controllers/bookingController.js";

const router = Router();

router.post("/booked", async (req, res) => {
  try {
    const response = await BookingController(req);

    if (response.error) {
      return res.status(400).json({ error: true, message: response.message });
    }
    if(response.status===300){
      return res.status(300).json({ error: true, message: response.message });
    }

    return res
      .status(200)
      .json({
        error: false,
        message:`${response.message}`,
        data: response.data,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message:
        "An unexpected error occurred while booking. Please try again later.",
    });
  }
});

export default router;
