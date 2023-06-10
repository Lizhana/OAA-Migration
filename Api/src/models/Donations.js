const { DataTypes } = require("sequelize");


module.exports =sequelize => { sequelize.define(
  "Donations",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    iso: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["ARS", "USD"]],
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
