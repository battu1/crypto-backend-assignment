import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export default Task;
