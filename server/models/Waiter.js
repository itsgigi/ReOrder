import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WaiterSchema = new Schema(
  {
    name: String,
    workingDates: Array,
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Waiter = mongoose.model("Waiter", WaiterSchema);

export default Waiter;