// index.ts

import express from "express";
import createError from "http-errors";
import carRoutes from "../routes/carRoutes";
import truckRoutes from "../routes/truckRoutes";
import customerRoutes from "../routes/customerRoutes";
import cors from "cors";

const app = express();

app.use(express.json(), cors());

// Use the carRoutes module for the '/cars' route
app.use('/cars', carRoutes);
app.use('/customers', customerRoutes);
app.use('/trucks', truckRoutes);

// handle 404 error
app.use((req, res, next) => {
    next(createError(404));
});

app.listen(3000, () =>
    console.log(`⚡️[server]: Server is running at https://localhost:3000`)
);
