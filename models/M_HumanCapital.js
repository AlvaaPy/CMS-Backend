import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Divisi from "./M_Divisi.js";

const { DataTypes } = Sequelize;

const TopikHuman = db.define(
  "topik_humancapital",
  {
    id_Divisi: {
      type: DataTypes.INTEGER,
      references: {
        model: Divisi,
        key: "id",
      },
    },
    nama_divisi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto_topik: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Divisi.hasMany(TopikHuman, { foreignKey: "id_Divisi" });
TopikHuman.belongsTo(Divisi, { foreignKey: "id_Divisi" });

export default TopikHuman;
