import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from 'multer';

const prisma = new PrismaClient();
const router = express.Router();

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set a unique filename for each uploaded file
    },
});

const upload = multer({ storage: storage });

// Get all customers
router.get('/', async (req: Request, res: Response) => {
    // Retrieve and return all customers from the database
    const customers = await prisma.customer.findMany();
    res.json(
        {
            success: true,
            data: customers
        }
    );
});

// Create a new customer
router.post('/', async (req: Request, res: Response) => {
    // Extract customer details from the request body
    const { name, address, phone, id_card_number, id_card_photo } = req.body;

    // Create a new customer entry in the database
    const customer = await prisma.customer.create({
        data: {
            name,
            address,
            phone,
            id_card_number,
            id_card_photo
        }
    });

    // Return the created customer details
    res.json(
        {
            success: true,
            data: customer
        }
    );
})

// Handle file upload for resources
router.post('/resource', upload.single('file'), async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
        // Handle case where no file is uploaded
        res.status(400).json({
            success: false,
            error: 'No file uploaded.'
        });
        return;
    }

    // Access uploaded file details
    const fileName = file.filename;
    const filePath = file.path;

    // Construct URL for serving the uploaded file
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;

    // Return details about the uploaded file
    res.json({
        success: true,
        data: {
            name: fileName,
            path: filePath,
            imageUrl: imageUrl, // Provide this URL to the frontend
        }
    });
});

// Update an existing customer by ID
router.put('/:id', async (req: Request, res: Response) => {
    // Extract customer details and ID from the request body and parameters
    const { name, address, phone, id_card_number, id_card_photo } = req.body;
    const { id } = req.params;

    // Update the specified customer in the database
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

    // Return the updated customer details
    res.json(
        {
            success: true,
            data: customer
        }
    );
})

// Delete an existing customer by ID
router.delete('/:id', async (req: Request, res: Response) => {
    // Extract customer ID from the request parameters
    const { id } = req.params;

    try {
        // Attempt to delete the specified customer from the database
        const deletedCustomer = await prisma.customer.delete({
            where: { id: parseInt(id) },
        });

        // Return the deleted customer details
        res.json({
            success: true,
            data: deletedCustomer,
        });
    } catch (error: any) {
        if (error.code === 'P2003') {
            // Handle foreign key constraint violation error
            return res.status(400).json({
                success: false,
                error: 'Cannot delete customer due to existing related records.',
            });
        }

        // Log and handle other errors
        console.error("Error deleting customer:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
})

export default router;