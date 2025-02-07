
import VehicleType from "./VehicleType.js";
import { Sequelize, sequelize } from "./index.js";
const Vehicle = sequelize.define("vehicle_database", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vehicle_type_id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      references: {
        model: "vehicle_type_databases", // Foreign key relation to the VehicleType table
        key: "id",
      },
    },
    is_available: {
      
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull:true
    },
    price_per_day: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
  });
  // VehicleType has many Vehicles
VehicleType.hasMany(Vehicle, {
  foreignKey: "vehicle_type_id",
  as: "vehicles",
});

Vehicle.belongsTo(VehicleType, {
  foreignKey: "vehicle_type_id",
  as: "vehicleType",
});


export default Vehicle