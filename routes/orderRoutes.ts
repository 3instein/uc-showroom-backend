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
            ...carOrders.map(order => ({ ...order, vehicle_type: 'car', vehicle_price: order.car.price })),
            ...truckOrders.map(order => ({ ...order, vehicle_type: 'truck', vehicle_price: order.truck.price })),
            ...motorcycleOrders.map(order => ({ ...order, vehicle_type: 'motorcycle', vehicle_price: order.motorcycle.price })),
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

router.delete('/cars/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await prisma.carOrder.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(
            {
                success: true,
                data: order
            }
        );
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
})

router.delete('/trucks/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await prisma.truckOrder.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(
            {
                success: true,
                data: order
            }
        );
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
})

router.delete('/motorcycles/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await prisma.motorcycleOrder.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(
            {
                success: true,
                data: order
            }
        );
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
})

export default router;