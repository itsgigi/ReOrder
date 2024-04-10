import mongoose from "mongoose";

const Schema = mongoose.Schema;

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