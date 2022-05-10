const Sequelize = require('sequelize');
const databaseConfig = require("../config/db.config.js");
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);
} 
else {
 sequelize = new Sequelize(databaseConfig.DB, databaseConfig.user, databaseConfig.pass, {
  host: databaseConfig.HOST,
  dialect: databaseConfig.dialect,
 
});
}

module.exports = sequelize;