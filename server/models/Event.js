import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const EventSchema = new Schema(
  {
    name: String,
    date: Date,
    pax: Number,
    menu: String // TODO: cambiare in File
  },
  { toJSON: { getters: true } }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;