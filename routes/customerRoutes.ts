import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from 'multer';

const prisma = new PrismaClient();
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set a unique filename for each uploaded file
    },
});

const upload = multer({ storage: storage });

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
    const { name, address, phone, id_card_number, id_card_photo } = req.body;

    const customer = await prisma.customer.create({
        data: {
            name,
            address,
            phone,
            id_card_number,
            id_card_photo
        }
    });
    res.json(
        {
            success: true,
            data: customer
        }
    );
})

router.post('/resource', upload.single('file'), async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
        res.status(400).json({
            success: false,
            error: 'No file uploaded.'
        });
        return;
    }

    // Accessing uploaded file details
    const fileName = file.filename;
    const filePath = file.path;

    // Assuming your server is serving static files from a 'uploads' directory
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;

    res.json({
        success: true,
        data: {
            name: fileName,
            path: filePath,
            imageUrl: imageUrl, // Provide this URL to the frontend
        }
    });
});

router.put('/:id', async (req: Request, res: Response) => {
    const { name, address, phone, id_card_number, id_card_photo } = req.body;
    const { id } = req.params;
    const customer = await prisma.customer.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            address,
            phone,
            id_card_number,
            id_card_photo
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