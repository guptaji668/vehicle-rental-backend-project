import { Router } from "express";
import VehicleType from "../models/VehicleType.js"
import Vehicle from "../models/Vehicle.js";
const router=Router();

router.get("/get-type/:wheels", async (req, res) => {
  const wheels = parseInt(req.params.wheels); // Convert to integer

  // Validate wheels input
  if (wheels !== 2 && wheels !== 4) {
    return res.status(400).json({error:true, message: "Invalid wheels count. Must be 2 or 4." });
  }

  try {
    // Fetch vehicles based on the wheels count
    const vehicles = await VehicleType.findAll({ where: { wheels } });

    // If no vehicles are found, return a 404 error
    if (vehicles?.length === 0) {
      return res.status(404).json({error:true, message: "No vehicles found for the specified wheels count." });
    }

    return res.status(200).json({
      error:false,
      message:"Vehicle Type Fetched Successfully!",
      data: vehicles
    })


  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ error:true, message: error.message });
  }
});


router.get("/get-model/:typeid", async (req, res) => {
  const typeId = parseInt(req.params.typeid); // Convert typeid to integer

  // Validate typeId input
  if (isNaN(typeId) || typeId <= 0) {
    return res.status(400).json({
      error: true,
      message: "Invalid or missing vehicle type ID. Please provide a valid type ID.",
    });
  }

  try {
    // Fetch vehicles based on the vehicle_type_id
    const vehicles = await Vehicle.findAll({ where: { vehicle_type_id: typeId } });

    // If no vehicles are found for the specified type, return a 404 error
    if (vehicles?.length === 0) {
      return res.status(404).json({
        error: true,
        message: `No vehicles found for the vehicle type ID ${typeId}.`,
      });
    }

    // Return the list of vehicles with a success message
    return res.status(200).json({
      error: false,
      message: "Vehicles fetched successfully for the specified type.",
      data: vehicles,
    });

  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "An unexpected error occurred while fetching vehicles. Please try again later.",
    });
  }
});





export default router
