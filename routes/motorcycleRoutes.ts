// carRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const motorcycles = await prisma.motorcycle.findMany();
    res.json(
        {
            success: true,
            data: motorcycles
        }
    );
});

export default router;