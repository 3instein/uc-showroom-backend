import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

    const cars = await prisma.car.createMany({
        data: [
            {
                model: "Camry",
                year: 2018,
                seats: 5,
                manufacturer: "Toyota",
                price:799299968,
                fuel_type: "BENSIN",
                trunk_capacity: 500,
            },
            {
                model: "Civic",
                year: 2017,
                seats: 5,
                manufacturer: "Honda",
                price: 609500000,
                fuel_type: "BENSIN",
                trunk_capacity: 500,
            },
        ],
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })