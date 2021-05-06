const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pokemon extends Model {}

Pokemon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    move_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    move_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    move_1_damage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    move_2_damage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    front_default: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    back_default: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    health_points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'pokemon',
  }
);

module.exports = Pokemon;