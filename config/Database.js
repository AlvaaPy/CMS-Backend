import { Sequelize } from "sequelize";

const db = new Sequelize('cms_detik', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
});

export default db;