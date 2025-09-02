PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`post_id` integer NOT NULL,
	`author` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_comments`("id", "post_id", "author", "content", "created_at") SELECT "id", "post_id", "author", "content", "created_at" FROM `comments`;--> statement-breakpoint
DROP TABLE `comments`;--> statement-breakpoint
ALTER TABLE `__new_comments` RENAME TO `comments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;