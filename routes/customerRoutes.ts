import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const customers = await prisma.customer.findMany();
    res.json(
        {
            success: true,
            data: customers
        }
    );
});

router.post('/', async (req: Request, res: Response) => {
    const { name, address, phone, id_card_number } = req.body;
    const customer = await prisma.customer.create({
        data: {
            name,
            address,
            phone,
            id_card_number
        }
    });
    res.json(
        {
            success: true,
            data: customer
        }
    );
})

router.put('/:id', async (req: Request, res: Response) => {
    const { name, address, phone, id_card_number } = req.body;
    const { id } = req.params;
    const customer = await prisma.customer.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            address,
            phone,
            id_card_number
        }
    });
    res.json(
        {
            success: true,
            data: customer
        }
    );
})

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Attempt to delete the customer
        const deletedCustomer = await prisma.customer.delete({
            where: { id: parseInt(id) },
        });

        res.json({
            success: true,
            data: deletedCustomer,
        });
    } catch (error: any) {
        if (error.code === 'P2003') {
            // P2003 is the Prisma error code for foreign key constraint violation
            return res.status(400).json({
                success: false,
                error: 'Cannot delete customer due to existing related records.',
            });
        }

        console.error("Error deleting customer:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
})



export default router;