// carRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all orders with details of the associated vehicles and customers
router.get('/', async (req: Request, res: Response) => {
    try {
        // Retrieve car orders with associated car and customer details
        const carOrders = await prisma.carOrder.findMany({
            include: {
                car: true,
                customer: true,
            },
        });

        // Retrieve truck orders with associated truck and customer details
        const truckOrders = await prisma.truckOrder.findMany({
            include: {
                truck: true,
                customer: true,
            },
        });

        // Retrieve motorcycle orders with associated motorcycle and customer details
        const motorcycleOrders = await prisma.motorcycleOrder.findMany({
            include: {
                motorcycle: true,
                customer: true,
            },
        });

        // Convert each order to a common structure with vehicle_type
        const ordersWithVehicleInfo = [
            ...carOrders.map(order => ({ ...order, vehicle_type: 'car', vehicle_price: order.car.price })),
            ...truckOrders.map(order => ({ ...order, vehicle_type: 'truck', vehicle_price: order.truck.price })),
            ...motorcycleOrders.map(order => ({ ...order, vehicle_type: 'motorcycle', vehicle_price: order.motorcycle.price })),
        ];

        res.json({
            success: true,
            data: ordersWithVehicleInfo,
        });
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
})

// Create a new order
router.post('/', async (req: Request, res: Response) => {
    try {
        const { customer_id, vehicle_id, vehicle_type } = req.body;
        let order;
        switch (vehicle_type) {
            case 'car':
                // Create a new car order with associated customer and car details
                order = await prisma.carOrder.create({
                    data: {
                        customerId: customer_id,
                        carId: vehicle_id,
                    },
                    include: {
                        car: true,
                        customer: true,
                    },
                });
                break;
            case 'truck':
                // Create a new truck order with associated customer and truck details
                order = await prisma.truckOrder.create({
                    data: {
                        customerId: customer_id,
                        truckId: vehicle_id,
                    },
                    include: {
                        truck: true,
                        customer: true,
                    },
                });
                break;
            case 'motorcycle':
                // Create a new motorcycle order with associated customer and motorcycle details
                order = await prisma.motorcycleOrder.create({
                    data: {
                        customerId: customer_id,
                        motorcycleId: vehicle_id,
                    },
                    include: {
                        motorcycle: true,
                        customer: true,
                    },
                });
                break;
            default:
                throw new Error(`Invalid vehicle_type: ${vehicle_type}`);
        }
        res.json(
            {
                success: true,
                data: order
            }
        );
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
})

// Update an existing order by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { customer_id, vehicle_id, vehicle_type } = req.body;
        const { id } = req.params;
        let order;
        switch (vehicle_type) {
            case 'car':
                // Update the specified car order with associated customer and car details
                order = await prisma.carOrder.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        customerId: customer_id,
                        carId: vehicle_id,
                    },
                    include: {
                        car: true,
                        customer: true,
                    },
                });
                break;
            case 'truck':
                // Update the specified truck order with associated customer and truck details
                order = await prisma.truckOrder.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        customerId: customer_id,
                        truckId: vehicle_id,
                    },
                    include: {
                        truck: true,
                        customer: true,
                    },
                });
                break;
            case 'motorcycle':
                // Update the specified motorcycle order with associated customer and motorcycle details
                order = await prisma.motorcycleOrder.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        customerId: customer_id,
                        motorcycleId: vehicle_id,
                    },
                    include: {
                        motorcycle: true,
                        customer: true,
                    },
                });
                break;
            default:
                throw new Error(`Invalid vehicle_type: ${vehicle_type}`);
        }
        res.json(
            {
                success: true,
                data: order
            }
        );
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
})

// Delete an existing car order by ID
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

// Delete an existing truck order by ID
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

// Delete an existing motorcycle order by ID
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