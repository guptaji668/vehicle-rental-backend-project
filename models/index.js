import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const PASSWORD = isProduction ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD;
const HOST = isProduction ? process.env.PROD_DB_HOST : process.env.DB_HOST;
const USER = isProduction ? process.env.PROD_DB_USERNAME : process.env.DB_USERNAME;
const DATABASE = isProduction ? process.env.PROD_DB_NAME : process.env.DB_NAME;
const DIALECT = process.env.DB_DIALECT || "postgres"; // Default to PostgreSQL

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: isProduction ? process.env.PROD_DB_PORT : 5432, // Default PostgreSQL port
  logging: false, // Disable logging in production
  define: {
    paranoid: true, // Soft delete support (adds deletedAt field)
    timestamps: true, // Enables createdAt & updatedAt fields
  },
});

export { Sequelize, sequelize };


