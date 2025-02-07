
import { Sequelize, sequelize } from "./index.js";
import Vehicle from "./Vehicle.js";
const VehicleType = sequelize.define("vehicle_type_database", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  wheels: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
//   Number of wheels (2 or 4).
});





export default VehicleType;
