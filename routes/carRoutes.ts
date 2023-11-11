// carRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const cars = await prisma.car.findMany();
    res.json(
        {
            success: true,
            data: cars
        }
    );
});

router.post('/', async (req: Request, res: Response) => {
    const { model, year, seats, manufacturer, price, fuel_type, trunk_capacity } = req.body;
    const car = await prisma.car.create({
        data: {
            model,
            year,
            seats,
            manufacturer,
            price,
            fuel_type,
            trunk_capacity
        }
    });
    res.json(
        {
            success: true,
            data: car
        }
    );
})

router.put('/:id', async (req: Request, res: Response) => {
    const { model, year, seats, manufacturer, price, fuel_type, trunk_capacity } = req.body;
    const { id } = req.params;
    const car = await prisma.car.update({
        where: {
            id: parseInt(id)
        },
        data: {
            model,
            year,
            seats,
            manufacturer,
            price,
            fuel_type,
            trunk_capacity
        }
    });
    res.json(
        {
            success: true,
            data: car
        }
    );
})

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await prisma.car.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(
        {
            success: true,
            data: car
        }
    );
})

export default router;