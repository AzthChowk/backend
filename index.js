import express from "express";
import connectDB from "./dbConnect.js";
import userRouter from "./config/user/userRoute.js";
import bikeRouter from "./config/bike/bikeRoute.js";
import bikeMaintenanceRecordRouter from "./config/bikeMaintenanceRecord/bikeMaintenanceRecordRoute.js";

// configure dotenv -- important
// dotenv.config();

//DATABASE CONNECT
await connectDB();

//REST OBJECT
const app = express();

// MIDDLEWARE
app.use(express.json());

//PORT
const PORT = 9090;

// // CORS
// // app.use((req, res, next) => {
// //   res.setHeader("Access-Control-Allow-Origin", "*");
// //   res.header(
// //     "Access-Control-Allow-Headers",
// //     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
// //   );

// //   if (req.method === "OPTIONS") {
// //     res.header("Access-Control-Expose-Headers", "accessToken, refreshToken,");
// //     res.header(
// //       "Access-Control-Allow-Methods",
// //       "PUT, POST, PATCH, DELETE, GET, OPTIONS"
// //     );
// //     return res.status(200).json({});
// //   }

// //   return next();
// // });

// //GET
// app.get("/", (req, res) => {
//   res.status(200).send("<h2>Football Tournament</h2>");
// });

//USE ROUTES
app.use(userRouter);
app.use(bikeRouter);
app.use(bikeMaintenanceRecordRouter);

// //GLOBAL ERROR HANDLER
// app.use((err, req, res, next) => {
//   debug(err.stack);
//   res.status(err.statusCode || 500);
//   res.send({ error: err.message });
// });

//LISTEN
app.listen(PORT, (req, res) => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}.`);
});
