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

router.put('/:id', async (req: Request, res: Response) => {
    const { model, year, seats, manufacturer, price, trunk_capacity, fuel_capacity } = req.body;
    const { id } = req.params;
    const motorcycle = await prisma.motorcycle.update({
        where: {
            id: parseInt(id)
        },
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

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const motorcycle = await prisma.motorcycle.delete({
        where: {
            id: parseInt(id)
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