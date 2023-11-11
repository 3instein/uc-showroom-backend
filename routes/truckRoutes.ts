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

router.put('/:id', async (req: Request, res: Response) => {
    const { model, year, seats, manufacturer, price, wheels, cargo_capacity } = req.body;
    const { id } = req.params;
    const truck = await prisma.truck.update({
        where: {
            id: parseInt(id)
        },
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

    try {
        const deletedTruck = await prisma.truck.delete({
            where: { id: parseInt(id) },
        });

        res.json({
            success: true,
            data: deletedTruck,
        })
    } catch (error: any) {
        if (error.code === 'P2003') {
            // P2003 is the Prisma error code for foreign key constraint violation
            return res.status(400).json({
                success: false,
                error: 'Cannot delete truck due to existing related records.',
            });
        }

        console.error("Error deleting truck:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
})

export default router;