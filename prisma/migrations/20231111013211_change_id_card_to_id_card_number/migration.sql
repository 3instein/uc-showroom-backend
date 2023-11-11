/*
  Warnings:

  - You are about to drop the column `id_card` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `id_card_number` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "id_card",
ADD COLUMN     "id_card_number" TEXT NOT NULL;
