/*
  Warnings:

  - A unique constraint covering the columns `[userId,modelId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_modelId_key" ON "Purchase"("userId", "modelId");
