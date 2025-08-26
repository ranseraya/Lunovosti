-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('admin', 'editor', 'author', 'subscriber', 'premium') NOT NULL DEFAULT 'subscriber';
