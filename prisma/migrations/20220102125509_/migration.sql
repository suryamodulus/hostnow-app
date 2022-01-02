/*
  Warnings:

  - A unique constraint covering the columns `[hostname]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Site_hostname_key" ON "Site"("hostname");
