const { Sequelize } = require('sequelize');
const fs   = require('fs');
const path = require('path');
require('dotenv').config();
const {MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_MOTOR } = process.env

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: MYSQL_MOTOR,
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente con la base de datos MySQL.');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos MySQL:', error);
  });
  
  
  const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

  modelDefiners.forEach((model) => model(sequelize));

  const entries = Object.entries(sequelize.models);
  const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const {
  AdminsSchema,
  Donations,
  Galleries,
  News,
  OurWorks,
  RadioPrograms,
  Subscribers
} = sequelize.models;

  
  module.exports = {
    ...sequelize.models,
    conn: sequelize,
  };
