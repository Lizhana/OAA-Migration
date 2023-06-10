const { DataTypes } = require("sequelize");
const {
  CisValidImage,
  isValidAudio,
  isValidMultimedia,
  isLabelsEmpty,
} = require("../utils/validate");

module.exports =sequelize => { sequelize.define(
  "RadioPrograms",
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
    introduction: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.JSON
    },
    audio: {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
}
