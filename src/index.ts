import { Request, Response } from "express";
import express from 'express';
import cors from "cors"
const app = express();

// Startsidan
app.get('/', (_: Request, res: Response) => {
    res.send('Hello World')
  })
  
// Middleware
app.use(express.json());
app.use(cors());

// Routes
import productsRouter from './routes/products'
app.use('/products', productsRouter)

import categoriesRouter from './routes/categories'
app.use('/categories', categoriesRouter)

import gendersRouter from './routes/genders'
app.use('/genders', gendersRouter)

// Port 3000
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})