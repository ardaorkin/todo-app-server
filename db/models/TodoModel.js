import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    user: String,
    title: String,
    mission: String,
    isDone: Boolean,
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
