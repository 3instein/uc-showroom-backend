// carRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const trucks = await prisma.truck.findMany();
    res.json(
        {
            success: true,
            data: trucks
        }
    );
});

router.post('/', async (req: Request, res: Response) => {
    const { model, year, seats, manufacturer, price, wheels, cargo_capacity } = req.body;
    const truck = await prisma.truck.create({
        data: {
            model,
            year,
            seats,
            manufacturer,
            price,
            wheels,
            cargo_capacity
        }
    });
    res.json(
        {
            success: true,
            data: truck
        }
    );
})

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const truck = await prisma.truck.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(
        {
            success: true,
            data: truck
        }
    );
})

export default router;