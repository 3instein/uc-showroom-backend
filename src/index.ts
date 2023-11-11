// index.ts

import express from "express";
import createError from "http-errors";
import carRoutes from "../routes/carRoutes";
import truckRoutes from "../routes/truckRoutes";
import motorcycleRoutes from "../routes/motorcycleRoutes";
import customerRoutes from "../routes/customerRoutes";
import orderRoutes from "../routes/orderRoutes";
import cors from "cors";
import path from "path";

const app = express();

app.use(express.json(), cors());

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Use the carRoutes module for the '/cars' route
app.use('/cars', carRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/trucks', truckRoutes);
app.use('/motorcycles', motorcycleRoutes);

// handle 404 error
app.use((req, res, next) => {
    next(createError(404));
});

app.listen(3000, () =>
    console.log(`⚡️[server]: Server is running at https://localhost:3000`)
);
