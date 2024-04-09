import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const WaiterSchema = new Schema(
  {
    name: String,
    workingDates: Array,
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Waiter = mongoose.model("Waiter", WaiterSchema);

export default Waiter;