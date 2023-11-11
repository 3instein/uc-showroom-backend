// carRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const carOrders = await prisma.carOrder.findMany({
            include: {
                car: true,
                customer: true,
            },
        });
        
        const truckOrders = await prisma.truckOrder.findMany({
            include: {
                truck: true,
                customer: true,
            },
        });
        
        const motorcycleOrders = await prisma.motorcycleOrder.findMany({
            include: {
                motorcycle: true,
                customer: true,
            },
        });
        
        // Convert each order to a common structure with vehicle_type
        const ordersWithVehicleType = [
            ...carOrders.map(order => ({ ...order, vehicle_type: 'car' })),
            ...truckOrders.map(order => ({ ...order, vehicle_type: 'truck' })),
            ...motorcycleOrders.map(order => ({ ...order, vehicle_type: 'motorcycle' })),
        ];
        
        res.json({
            success: true,
            data: ordersWithVehicleType,
        });        
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
})

export default router;