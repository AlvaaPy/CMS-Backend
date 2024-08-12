import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Admin = db.define(
  "admin",
  {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Admin;
(async () => {
  await db.sync();
  console.log("Database synced successfully.");
})();
