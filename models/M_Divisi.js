// models/Divisi.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Divisi = db.define(
  "divisi",
  {
    nama_divisi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto_divisi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Divisi;
