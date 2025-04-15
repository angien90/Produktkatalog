import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IProducts } from "../models/IProducts";
import { IProductsDBResponse } from "../models/IProductsDBResponse";

// Get all products
export const fetchAllProducts = async (req: Request, res: Response) => {

  try {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM products')
    res.json(rows)
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

// Get a specific product
export const fetchProduct = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const sql = `
      SELECT 
        todos.id AS todo_id,
        todos.content AS todo_content,
        todos.done AS todo_done,
        todos.created_at AS todo_created_at,
        subtasks.id AS subtask_id,
        subtasks.todo_id AS subtask_todo_id,
        subtasks.content AS subtask_content,
        subtasks.done AS subtask_done,
        subtasks.created_at AS subtask_created_at
      FROM todos
      LEFT JOIN subtasks ON todos.id = subtasks.todo_id
      WHERE todos.id = ?
    `
    const [rows] = await db.query<IProductsDBResponse[]>(sql, [id])
    const product = rows[0];
    if (!product) {
      res.status(404).json({message: 'Product not found'})
      return;
    }
    res.json(formatProduct(rows))
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

const formatPost = (rows: IProductsDBResponse[]) => ({
  id:         rows[0].product_id,
  content:    rows[0].product_content,
  done:       rows[0].product_done,
  created_at: rows[0].product_created_at,
  categories: rows.map((row) => ({
      id:        row.category_id,
      product_id:   row.category_product_id,
      content:   row.category_content,
      done:      row.category_done,
      created_at:row.category_created_at
  }))
})

// Create a product
export const createProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { titel, description, stock, price, image } = req.body;
 
    if (!titel || !description || !stock || !price || !image) {
    res.status(400).json({error: 'Title, description, stock, price and image is required'}) 
    return; 
  }

  try {
    const sql = `
      INSERT INTO products (content)
      VALUES (?)
    `
    const [result] = await db.query<ResultSetHeader>(sql, [titel, description, stock, price, image, id])
    res.status(201).json({message: 'Product is created', id: result.insertId})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { titel, description, stock, price, image } = req.body;

    if (!titel || !description || !stock || !price || !image) {
        res.status(400).json({ error: 'Title, description, stock, price and image is required' });
        return;
      }

    try {
    const sql = `
        UPDATE products 
        SET titel = ?, description = ?, stock = ?, price = ?, image = ?
        WHERE id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(sql, [
        titel,
        description,
        stock,
        price,
        image,
        id
    ]);

    if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Product could not be updated' });
        return;
    }

    res.json({ message: 'Product updated' });
    } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
    }
}

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const sql = `
      DELETE FROM products
      WHERE id = ?
    `
    const [result] = await db.query<ResultSetHeader>(sql, [id])
    if (result.affectedRows === 0) {
      res.status(404).json({message: 'Product not found'})
      return;
    }
    res.json({message: 'Product deleted'})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}