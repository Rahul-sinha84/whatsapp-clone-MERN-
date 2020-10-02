import mongoose from "mongoose";
import { messageSchema } from "./message";

const roomSchema = new mongoose.Schema({
  name: String,
  lastMessage: Object,
  messages: [messageSchema],
});

export const Room = mongoose.model("rooms", roomSchema);
