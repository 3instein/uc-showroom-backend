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
    try {
        const deletedMotorcycle = await prisma.motorcycle.delete({
            where: { id: parseInt(id) },
        });

        res.json({
            success: true,
            data: deletedMotorcycle,
        })
    } catch (error: any) {
        if (error.code === 'P2003') {
            // P2003 is the Prisma error code for foreign key constraint violation
            return res.status(400).json({
                success: false,
                error: 'Cannot delete motorcycle due to existing related records.',
            });
        }

        console.error("Error deleting motorcycle:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
})

export default router;