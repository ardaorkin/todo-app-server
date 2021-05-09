import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    user: String,
    title: String,
    mission: String,
    isDone: Boolean,
    owner_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
