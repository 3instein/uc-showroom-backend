// carRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const cars = await prisma.car.findMany();
    res.json(
        {
            success: true,
            data: cars
        }
    );
});

export default router;