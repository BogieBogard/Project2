module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    location: {
      type: DataTypes.STRING,
      len: [1]
    },
    photo: {
      type: DataTypes.TEXT,
      len: [1]
    },
    numberOfProjects: {
      type: DataTypes.INTEGER
    },
    avgRating: {
      type: DataTypes.INTEGER
    },
    ratingCount: {
      type: DataTypes.INTEGER
    }
  });

  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js

  Customer.associate = function (models) {
    models.Customer.hasMany(models.Project, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
            }
    });
  };
  return Customer;
};
