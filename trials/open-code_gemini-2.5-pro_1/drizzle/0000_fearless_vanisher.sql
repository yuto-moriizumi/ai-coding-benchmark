CREATE TABLE `articles` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` integer PRIMARY KEY NOT NULL,
	`article_id` integer NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE no action
);
