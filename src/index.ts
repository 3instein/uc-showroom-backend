// index.ts

import express from "express";
import createError from "http-errors";
import carRoutes from "../routes/carRoutes";

const app = express();

app.use(express.json());

// Use the carRoutes module for the '/cars' route
app.use('/cars', carRoutes);

// handle 404 error
app.use((req, res, next) => {
    next(createError(404));
});

app.listen(3000, () =>
    console.log(`⚡️[server]: Server is running at https://localhost:3000`)
);
