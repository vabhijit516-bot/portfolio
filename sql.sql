CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_email VARCHAR(255),
  admin_email VARCHAR(255),
  message_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
