// carRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const motorcycles = await prisma.motorcycle.findMany();
    res.json(
        {
            success: true,
            data: motorcycles
        }
    );
});

router.post('/', async (req: Request, res: Response) => {
    const { model, year, seats, manufacturer, price, trunk_capacity, fuel_capacity } = req.body;
    const motorcycle = await prisma.motorcycle.create({
        data: {
            model,
            year,
            seats,
            manufacturer,
            price,
            trunk_capacity,
            fuel_capacity
        }
    });
    res.json(
        {
            success: true,
            data: motorcycle
        }
    );
})

export default router;