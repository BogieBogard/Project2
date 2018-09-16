module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    html: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    css: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    javascript: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    java: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    nodeJS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    angular: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    react: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    python: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: 0,
        len: [1]
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
  return Project;
};
