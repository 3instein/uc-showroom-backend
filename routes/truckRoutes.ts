// truckRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all trucks
router.get('/', async (req: Request, res: Response) => {
    // Retrieve and return all trucks from the database
    const trucks = await prisma.truck.findMany();
    res.json(
        {
            success: true,
            data: trucks
        }
    );
});

// Create a new truck
router.post('/', async (req: Request, res: Response) => {
    // Extract truck details from the request body
    const { model, year, seats, manufacturer, price, wheels, cargo_capacity } = req.body;
    
    // Create a new truck entry in the database
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

    // Return the created truck details
    res.json(
        {
            success: true,
            data: truck
        }
    );
})

// Update an existing truck by ID
router.put('/:id', async (req: Request, res: Response) => {
    // Extract truck details and ID from the request body and parameters
    const { model, year, seats, manufacturer, price, wheels, cargo_capacity } = req.body;
    const { id } = req.params;

    // Update the specified truck in the database
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

    // Return the updated truck details
    res.json(
        {
            success: true,
            data: truck
        }
    );
})

// Delete an existing truck by ID
router.delete('/:id', async (req: Request, res: Response) => {
    // Extract truck ID from the request parameters
    const { id } = req.params;

    try {
        // Attempt to delete the specified truck from the database
        const deletedTruck = await prisma.truck.delete({
            where: { id: parseInt(id) },
        });

        // Return the deleted truck details
        res.json({
            success: true,
            data: deletedTruck,
        });
    } catch (error: any) {
        if (error.code === 'P2003') {
            // Handle foreign key constraint violation error
            return res.status(400).json({
                success: false,
                error: 'Cannot delete truck due to existing related records.',
            });
        }

        // Log and handle other errors
        console.error("Error deleting truck:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
})

export default router;