const { DataTypes } = require("sequelize");
const {
  isValidImage,
  isValidMultimedia,
  isLabelsEmpty,
} = require("../utils/validate");

const categories = ["Novedades", "Comunidades", "Agroecología"];

module.exports =sequelize => { sequelize.define(
  "News",
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
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [categories],
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlAuthor: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    multimedia: {
      type: DataTypes.JSON
    },
    visitorCounter: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
