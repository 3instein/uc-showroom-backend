import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all motorcycles
router.get('/', async (req: Request, res: Response) => {
    // Retrieve and return all motorcycles from the database
    const motorcycles = await prisma.motorcycle.findMany();
    res.json(
        {
            success: true,
            data: motorcycles
        }
    );
});

// Create a new motorcycle
router.post('/', async (req: Request, res: Response) => {
    // Extract motorcycle details from the request body
    const { model, year, seats, manufacturer, price, trunk_capacity, fuel_capacity } = req.body;
    
    // Create a new motorcycle entry in the database
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

    // Return the created motorcycle details
    res.json(
        {
            success: true,
            data: motorcycle
        }
    );
})

// Update an existing motorcycle by ID
router.put('/:id', async (req: Request, res: Response) => {
    // Extract motorcycle details and ID from the request body and parameters
    const { model, year, seats, manufacturer, price, trunk_capacity, fuel_capacity } = req.body;
    const { id } = req.params;

    // Update the specified motorcycle in the database
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

    // Return the updated motorcycle details
    res.json(
        {
            success: true,
            data: motorcycle
        }
    );
})

// Delete an existing motorcycle by ID
router.delete('/:id', async (req: Request, res: Response) => {
    // Extract motorcycle ID from the request parameters
    const { id } = req.params;

    try {
        // Attempt to delete the specified motorcycle from the database
        const deletedMotorcycle = await prisma.motorcycle.delete({
            where: { id: parseInt(id) },
        });

        // Return the deleted motorcycle details
        res.json({
            success: true,
            data: deletedMotorcycle,
        })
    } catch (error: any) {
        if (error.code === 'P2003') {
            // Handle foreign key constraint violation error
            return res.status(400).json({
                success: false,
                error: 'Cannot delete motorcycle due to existing related records.',
            });
        }

        // Log and handle other errors
        console.error("Error deleting motorcycle:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
})

export default router;