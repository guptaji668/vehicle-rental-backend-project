import { Router } from "express";
const { default: booking } = await import('./bookingRoutes.js');
const { default: vehicle } = await import('./vehicleRoutes.js');
const router=Router();

router.use("/booking",booking)
router.use("/vehicle",vehicle)


router.use((req, res, next) => {
    return res.status(404).json({ error: true, message: 'Route not found' });
  });

export default router;