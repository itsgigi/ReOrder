import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    buyer: {
      type: String,
      required: true,
    },
    amount: Number,
    productIds: [
      {
        productId: String,
        company: String,
        price: Number,
        quantity: String,
        company: String
      },
    ]
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;