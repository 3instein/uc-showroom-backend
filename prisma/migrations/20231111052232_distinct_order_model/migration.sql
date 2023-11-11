/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "order_car_fk";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "order_motorcycle_fk";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "order_truck_fk";

-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "CarOrder" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "CarOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TruckOrder" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "truckId" INTEGER NOT NULL,

    CONSTRAINT "TruckOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotorcycleOrder" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "motorcycleId" INTEGER NOT NULL,

    CONSTRAINT "MotorcycleOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarOrder" ADD CONSTRAINT "CarOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarOrder" ADD CONSTRAINT "CarOrder_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TruckOrder" ADD CONSTRAINT "TruckOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TruckOrder" ADD CONSTRAINT "TruckOrder_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorcycleOrder" ADD CONSTRAINT "MotorcycleOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorcycleOrder" ADD CONSTRAINT "MotorcycleOrder_motorcycleId_fkey" FOREIGN KEY ("motorcycleId") REFERENCES "Motorcycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
