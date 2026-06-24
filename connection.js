import { MongoClient } from 'mongodb';

async function setupDatabase() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // Create database
    const db = client.db('school_db');

    // Create collections
    await db.createCollection('students');
    await db.createCollection('courses');
    await db.createCollection('grades');

    console.log('Database "school_db" created');
    console.log('Collections: students, courses, grades');

    // Add indexes
    await db.collection('students').createIndex({ email: 1 }, { unique: true });
    await db.collection('courses').createIndex({ code: 1 }, { unique: true });

    console.log('Indexes created');

    // Insert sample data
    await db.collection('students').insertMany([
      { name: 'Alice', email: 'alice@school.com', age: 20 },
      { name: 'Bob', email: 'bob@school.com', age: 21 }
    ]);

    console.log('Sample data inserted');

  } finally {
    await client.close();
  }
}

setupDatabase();
