import mongoose from 'mongoose';

// Task Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    // Tự động thêm trường createdAt và updatedAt
    timestamps: true,
  },
);

// Task Model
const Task = mongoose.model('Task', taskSchema);
export default Task;
