module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
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

  // Post.associate = function (models) {
  //   models.Post.belongsTo(models.Author, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false
  //           }
  //   });
  // };
  return Customer;
};
