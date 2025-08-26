-- AlterTable
ALTER TABLE `articles` MODIFY `status` ENUM('draft', 'pending_review', 'published', 'archived') NOT NULL DEFAULT 'draft';
