import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes/index.js'
import { Sequelize, sequelize } from "./models/index.js";
import Vehicle from "./models/Vehicle.js"
import VehicleType from "./models/VehicleType.js"
import Booking from "./models/Booking.js"

const app=express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Necessary for form data

// Enable CORS before routes
app.use(cors())
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use("/v1/", routes);

// sync database table

// sequelize.sync({ force:false, alter: true, logging: false }).then(() => {
//   console.log("Database synced");
// }).catch((err) => {
//   console.error(err);
// });
//  sequelize.sync({ alter: true });
// VehicleType.sync({ force: true});
// Vehicle.sync({ force: true});
// Booking.sync({ force:true});

// import("./models/begin.js")

const PORT=process.env.PORT || 5000


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
