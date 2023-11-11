/*
  Warnings:

  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Vehicle";

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "trunk_capacity" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Truck" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "wheels" INTEGER NOT NULL,
    "cargo_capacity" INTEGER NOT NULL,

    CONSTRAINT "Truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motorcycle" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "trunk_capacity" INTEGER NOT NULL,
    "fuel_capacity" INTEGER NOT NULL,

    CONSTRAINT "Motorcycle_pkey" PRIMARY KEY ("id")
);
