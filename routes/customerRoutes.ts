// carRoutes.ts

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

export default router;