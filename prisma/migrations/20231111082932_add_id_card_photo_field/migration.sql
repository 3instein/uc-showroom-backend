/*
  Warnings:

  - Added the required column `id_card_photo` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "id_card_photo" TEXT NOT NULL;
