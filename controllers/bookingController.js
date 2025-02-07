
import { Op } from "sequelize";
import Booking from "../models/Booking.js"

export const BookingController = async (req) => {
  try {
    const { firstName, lastName, vehicle_id, startDate, endDate, status } = req.body;

    if (!firstName || !lastName || !vehicle_id || !startDate || !endDate || !status) {
      return { error: true, message: "Please fill all fields" };
    }

    // Normalize the date format to match database timestamp
    const startDateTime = new Date(`${startDate}T00:00:00.000Z`); // Start of day
    const endDateTime = new Date(`${endDate}T23:59:59.999Z`); // End of day

    // Check if the vehicle is already booked within the selected date range
    const existingBooking = await Booking.findOne({
      where: {
        vehicle_id,
        [Op.or]: [
          { startDate: { [Op.between]: [startDateTime, endDateTime] } }, // Existing booking starts within range
          { endDate: { [Op.between]: [startDateTime, endDateTime] } }, // Existing booking ends within range
          {
            startDate: { [Op.lte]: startDateTime }, 
            endDate: { [Op.gte]: endDateTime } // Existing booking fully overlaps selected range
          }
        ],
      },
    });

    if (existingBooking) {
      return {
        status:300,
        error:false,
        message: `This vehicle is already booked between ${new Date(existingBooking.startDate).toLocaleDateString()} and 
        ${new Date(existingBooking.endDate).toLocaleDateString()}.`

      };
    }

    // Create new booking
    const newBooking = await Booking.create({
      firstName,
      lastName,
      vehicle_id,
      startDate: startDateTime,
      endDate: endDateTime,
      status,
    });

    return {
      error: false,
      message: "Booking created successfully",
      data: newBooking,
    };

  } catch (error) {
    console.error("Error creating booking:", error);
    return { error: true, status: 500, message: "Internal server error" };
  }
};
