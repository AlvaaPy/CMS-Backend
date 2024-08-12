// models/MarketingMateri.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import TopikMarketing from "./M_TopikMarketing.js"

const { DataTypes } = Sequelize;

const MarketingMateri = db.define(
  "marketing_materi",
  {
    materi_media: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_topik_marketing: {
      type: DataTypes.INTEGER,
      references: {
        model: TopikMarketing,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

TopikMarketing.hasMany(MarketingMateri, { foreignKey: "id_topik_marketing" });
MarketingMateri.belongsTo(TopikMarketing, { foreignKey: "id_topik_marketing" });

export default MarketingMateri;
