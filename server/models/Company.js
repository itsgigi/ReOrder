import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const CompanySchema = new Schema(
  {
    name: String,
    orderDate: String,
    deliveryDate: String
  },
  { toJSON: { getters: true } }
);

const Company = mongoose.model("Company", CompanySchema);

export default Company;