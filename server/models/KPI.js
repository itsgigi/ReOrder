import mongoose from "mongoose";

const Schema = mongoose.Schema;

const daySchema = new Schema(
  {
    date: String,
    revenue: Number,
    expenses: Number,
  },
  { toJSON: { getters: true } }
);

const monthSchema = new Schema(
  {
    month: String,
    revenue: Number,
    expenses: Number,
    operationalExpenses: Number,
    nonOperationalExpenses: Number,
  },
  { toJSON: { getters: true } }
);

const KPISchema = new Schema(
  {
    totalProfit: Number,
    totalRevenue: Number,
    totalExpenses: Number,
    expensesByCategory: Number,
    monthlyData: [monthSchema],
    dailyData: [daySchema],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;