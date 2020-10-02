import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
  message: String,
  name: String,
  uniqueId: String,
  timestamp: String,
});

export const Message = mongoose.model("messages", messageSchema);
