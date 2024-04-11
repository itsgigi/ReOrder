import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: String,
    date: Date,
    pax: Number,
    price: Number,
    menu: String // TODO: cambiare in File
  },
  { toJSON: { getters: true } }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;