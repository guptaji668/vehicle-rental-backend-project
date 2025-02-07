import Vehicle from "./Vehicle.js";
import VehicleType from "./VehicleType.js";

const createVehicleTypesAndVehicles = async () => {
  const types = [
    { name: "Hatchback", wheels: 4 }, // Car type
    { name: "SUV", wheels: 4 },       // Car type
    { name: "Sedan", wheels: 4 },     // Car type
    { name: "Cruiser", wheels: 2 },   // Bike type
    { name: "Sports", wheels: 2 },    // Bike type
  ];

  // Use `findOrCreate` to avoid duplicates
  for (const type of types) {
    const [vehicleType, created] = await VehicleType.findOrCreate({
      where: { name: type.name }, // Condition to check if the record exists
      defaults: type,             // Data to create if the record does not exist
    });

    // Check if the vehicle type was created or already exists
    if (created) {
      console.log(`Vehicle type ${vehicleType.name} created.`);
    } else {
      console.log(`Vehicle type ${vehicleType.name} already exists.`);
    }

    // Define realistic vehicles for each type
    const vehicles = {
      Hatchback: [
        { name: "Toyota Yaris", price_per_day: 170 },
        { name: "Honda Jazz", price_per_day: 115 },
        { name: "Maruti Swift", price_per_day: 175 },
        { name: "Hyundai i20", price_per_day: 110 },
      ],
      SUV: [
        { name: "Toyota Fortuner", price_per_day: 150 },
        { name: "Ford Endeavour", price_per_day: 140 },
      ],
      Sedan: [
        { name: "Honda Accord", price_per_day: 100 },
        { name: "Mercedes-Benz E-Class", price_per_day: 200 },
      ],
      Cruiser: [
        { name: "Harley-Davidson Iron 883", price_per_day: 120 },
        { name: "Royal Enfield Classic 350", price_per_day: 100 },
        { name: "Harley Davidson", price_per_day: 140 },
      ],
      Sports: [
        { name: "Kawasaki Ninja ZX-10R", price_per_day: 250 },
        { name: "Yamaha R15", price_per_day: 150 },
        { name: "Honda Sine", price_per_day: 100 },
      ]
    };

    // Insert vehicles based on vehicle type
    const vehicleData = vehicles[type.name];

    for (const vehicle of vehicleData) {
      await Vehicle.findOrCreate({
        where: { name: vehicle.name },
        defaults: {
          name: vehicle.name,
          vehicle_type_id: vehicleType.id, // Associate with correct vehicle_type_id
          price_per_day: vehicle.price_per_day,
        },
      });
      console.log(`Vehicle ${vehicle.name} created or already exists.`);
    }
  }
};

// Call the function to create vehicle types and vehicles
createVehicleTypesAndVehicles()
  .then(() => console.log("Vehicle types and vehicles seeded successfully!"))
  .catch((err) => console.error("Error seeding vehicle types and vehicles:", err));
