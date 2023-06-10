const { DataTypes } = require("sequelize");
const {
  isValidImage,
  isValidMultimedia,
  isLabelsEmpty,
} = require("../utils/validate");

module.exports =sequelize => { sequelize.define(
  "OurWorks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titleMain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT('long'),
    },
    image: {
      type: DataTypes.JSON
    },
    multimedia: {
      type: DataTypes.JSON
    },
    labels: {
      type: DataTypes.JSON
    },
    extraData: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
}
