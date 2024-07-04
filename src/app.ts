import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import httpStatus from "http-status";
import bodyParser from "body-parser";
import { productsRoute } from "./app/modules/Products/products.route";
import { ordersRoute } from "./app/modules/Orders/order.route";

const corsOptions = {
  origin: ["*", "http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};
//parser
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
// Applications route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: 200, message: " Our server is Running 🚀" });
});
//products
app.use("/api", productsRoute);
app.use("/api", ordersRoute);

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: "Something went wrong",
    err,
  });
});

// route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    messase: "Not Found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API NOT FOUND!",
      },
    ],
  });
  next();
});

export default app;
