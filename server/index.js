import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import companyRoutes from "./routes/company.js";
import waiterRoutes from "./routes/waiter.js";
import eventsRoutes from "./routes/event.js";
import usersRoutes from "./routes/user.js";
import cookieParser from 'cookie-parser'

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var whitelist = ['http://localhost:5173' ]
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);
app.use("/company", companyRoutes);
app.use("/waiter", waiterRoutes);
app.use("/event", eventsRoutes);
app.use("/user", usersRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));