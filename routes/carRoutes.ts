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

    try {
        const deletedCar = await prisma.car.delete({
            where: { id: parseInt(id) },
        });

        res.json({
            success: true,
            data: deletedCar,
        })
    } catch (error: any) {
        if (error.code === 'P2003') {
            // P2003 is the Prisma error code for foreign key constraint violation
            return res.status(400).json({
                success: false,
                error: 'Cannot delete car due to existing related records.',
            });
        }

        console.error("Error deleting car:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
})

export default router;