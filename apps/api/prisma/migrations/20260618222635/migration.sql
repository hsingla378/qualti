/*
  Warnings:

  - A unique constraint covering the columns `[id,organizationId]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Site_id_organizationId_key" ON "Site"("id", "organizationId");
