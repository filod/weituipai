var bcrypt = require('bcrypt');
var logger = require('../common/logger');
module.exports = function(sequelize, DataTypes) {

  return sequelize.define('Video', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    thumb: DataTypes.STRING,
    video: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: "inactive"
    },
    ctime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    viewcount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: false,
    classMethods: {
            
    },
    instanceMethods: {
      printAll: function() {
        console.log(JSON.stringify(this));
      }
    }
  });
}