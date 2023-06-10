const { DataTypes } = require("sequelize");
const { isValidVideo, isValidMultimedia } = require("../utils/validate");

const categories = ["Imagen", "Video"];
const platformVideo = ["YouTube", "Other"];
const typeMultimedia = ["Audio", "PDF"];

module.exports =sequelize => { sequelize.define(
  "Galleries",
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
    introduction: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT('long'),
    },
    image: {
      type: DataTypes.JSON
    },
    video: {
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
