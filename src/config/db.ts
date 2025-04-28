// Install npm install dotenv mysql2 cors + npm install -D @types/dotenv @types/cors

import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

// Create the connection pool. Vår default
export const db = mysql.createPool({
    host:     process.env.DB_HOST || "",
    user:     process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    port:     parseInt(process.env.DB_PORT || "3306")
  });

// Controll the connection
export const connectToDatabase = async () => {
    try {
      await db.getConnection();
      console.log('Connected to DB')
    } catch (error: unknown) {
      console.log('Error connecting to DB: ' + error)
    }
  }