
import Vehicle from "./Vehicle.js";
import { Sequelize, sequelize } from "./index.js";

const Booking = sequelize.define("booking_database", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vehicle_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue:0   // 0:pending 1: confirmed 2 : canceled
  },

  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  createdAt:{
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  }
});

  
  // Vehicle has many Bookings
  Vehicle.hasMany(Booking, {
    foreignKey: "vehicle_id",
    as: "bookings",
  });
  
  Booking.belongsTo(Vehicle, {
    foreignKey: "vehicle_id",
    as: "vehicle",
  });


export default Booking;
