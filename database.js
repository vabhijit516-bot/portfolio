import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

async function createDatabase() {
  try {
    await client.connect();

    // Select/create database
    const db = client.db('my_database');

    // Create collection with schema validation (optional)
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'email'],
          properties: {
            name: { bsonType: 'string' },
            email: { bsonType: 'string' },
            age: { bsonType: 'int' }
          }
        }
      }
    });

    console.log('Database and collection created!');

    // Insert sample data
    await db.collection('users').insertOne({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });

    console.log('Sample data inserted!');
  } finally {
    await client.close();
  }
}

createDatabase();
