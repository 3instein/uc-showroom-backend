// carRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const trucks = await prisma.truck.findMany();
    res.json(
        {
            success: true,
            data: trucks
        }
    );
});

export default router;