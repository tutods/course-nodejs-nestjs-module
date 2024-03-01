/*
  Warnings:

  - You are about to drop the column `endAt` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `end_At` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_at` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "endAt",
DROP COLUMN "startAt",
ADD COLUMN     "end_At" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user_tasks" DROP COLUMN "createdAt",
ADD COLUMN     "ceated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
