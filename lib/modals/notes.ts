import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
const Note = models.Note || model("Note", UserSchema);
export default Note;
