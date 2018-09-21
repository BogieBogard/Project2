module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    dueDate: {
      type: DataTypes.DATE
    },
    cost: {
      type: DataTypes.INTEGER
    },
    html: {
      type: DataTypes.INTEGER,
    },
    css: {
      type: DataTypes.INTEGER,
    },
    javascript: {
      type: DataTypes.INTEGER,
    },
    java: {
      type: DataTypes.INTEGER,
    },
    nodeJS: {
      type: DataTypes.INTEGER,
    },
    angular: {
      type: DataTypes.INTEGER,
    },
    react: {
      type: DataTypes.INTEGER,
    },
    python: {
      type: DataTypes.INTEGER,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: 0,
      len: [1]
    },
    isAssigned: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: 0,
      len: [1]
    }
  });

  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js

  Project.associate = function(models) {
    models.Project.belongsTo(models.Customer, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Project;
};
