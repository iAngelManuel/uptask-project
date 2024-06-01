import mongoose, { Schema, Document, Types } from 'mongoose'

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus]

export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId
  status: TaskStatus
  completedBy: {
    user: Types.ObjectId
    status: TaskStatus
  }[]
}

const taskStatus = {
  PENDING: 'pending',
  ON_HOLD: 'onHold',
  IN_PROGRESS: 'inProgress',
  UNDER_REVIEW: 'underReview',
  COMPLETED: 'completed',
} as const

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
    completedBy: [
      {
        user: {
          type: Types.ObjectId,
          ref: 'User',
          default: null,
        },
        status: {
          type: String,
          enum: Object.values(taskStatus),
          default: taskStatus.PENDING,
        },
      },
    ],
  },
  { timestamps: true },
)

export const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
