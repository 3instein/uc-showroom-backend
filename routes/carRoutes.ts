import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all cars
router.get('/', async (req: Request, res: Response) => {
    // Retrieve and return all cars from the database
    const cars = await prisma.car.findMany();
    res.json(
        {
            success: true,
            data: cars
        }
    );
});

// Create a new car
router.post('/', async (req: Request, res: Response) => {
    // Extract car details from the request body
    const { model, year, seats, manufacturer, price, fuel_type, trunk_capacity } = req.body;
    
    // Create a new car entry in the database
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

    // Return the created car details
    res.json(
        {
            success: true,
            data: car
        }
    );
})

// Update an existing car by ID
router.put('/:id', async (req: Request, res: Response) => {
    // Extract car details and ID from the request body and parameters
    const { model, year, seats, manufacturer, price, fuel_type, trunk_capacity } = req.body;
    const { id } = req.params;

    // Update the specified car in the database
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

    // Return the updated car details
    res.json(
        {
            success: true,
            data: car
        }
    );
})

// Delete an existing car by ID
router.delete('/:id', async (req: Request, res: Response) => {
    // Extract car ID from the request parameters
    const { id } = req.params;

    try {
        // Attempt to delete the specified car from the database
        const deletedCar = await prisma.car.delete({
            where: { id: parseInt(id) },
        });

        // Return the deleted car details
        res.json({
            success: true,
            data: deletedCar,
        })
    } catch (error: any) {
        if (error.code === 'P2003') {
            // Handle foreign key constraint violation error
            return res.status(400).json({
                success: false,
                error: 'Cannot delete car due to existing related records.',
            });
        }

        // Log and handle other errors
        console.error("Error deleting car:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
})

export default router;