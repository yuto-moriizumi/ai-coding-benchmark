# Blog App

A simple blog application built with Next.js, TypeScript, and a JSON-based file storage system.

## Features

- Create and view blog posts
- Add comments to posts
- Reset all data
- Responsive design with Tailwind CSS

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: JSON file-based database

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the application:

   ```bash
   npm run build
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Or start the production server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating Posts

1. Click "Add new article" on the homepage
2. Fill in the title and content
3. Click "Publish Post" to create the post

### Viewing Posts

- All posts are displayed on the homepage
- Click on a post title to view the full post and comments

### Adding Comments

1. Navigate to a specific post
2. Fill in your name and comment
3. Click "Submit" to add the comment

### Resetting Data

- Click "Reset data" on the homepage to remove all posts and comments

## Data Storage

The application uses a simple JSON file (`blog.db.json`) to store all data. This file is automatically created and managed by the application.

## Testing

The application includes end-to-end tests that verify:

- Data reset functionality
- Post creation and viewing
- Comment functionality

Run tests with:

```bash
WEB_APP_PATH=[path to app] npm test
```
