import { db } from '@/db';
import { posts } from '@/db/schema';

async function seedData() {
  try {
    // Create a test post with id=1
    await db.insert(posts).values({
      id: 1,
      title: 'Test Post',
      content: 'This is a test post for the blog.',
    });
    
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Failed to insert seed data:', error);
  }
}

seedData();
