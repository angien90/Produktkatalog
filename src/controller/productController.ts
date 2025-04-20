import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

import { IProductsDBResponse } from "../models/IProductsDBResponse";

// Get all products
export const fetchAllProducts = async (req: Request, res: Response) => {
  const search = req.query.search?.toString();
  const sort = req.query.sort?.toString()?.toLowerCase();
  const gender = req.query.gender?.toString();
  const category = req.query.category?.toString();

  let sql = 'SELECT DISTINCT p.* FROM products p';
  const params: any[] = [];

  // Lägg till INNER JOINs beroende på vilka filter som används
  if (gender) {
    sql += ' INNER JOIN product_gender pg ON p.products_id = pg.products_id';
  }

  if (category) {
    sql += ' INNER JOIN product_categories pc ON p.products_id = pc.product_id'; 
  }

  // WHERE 1=1 för att kunna lägga till AND-villkor
  sql += ' WHERE 1=1';

  // Filtrera på kön
  if (gender) {
    sql += ' AND pg.genders_id = ?';
    params.push(gender);
  }

  // Filtrera på kategori
  if (category) {
    sql += ' AND pc.category_id = ?';
    params.push(category);
  }

  // Filtrera på sökord i titel
  if (search) {
    sql += ' AND p.title LIKE ?';
    params.push(`%${search}%`);
  }

  // Sortera om begärt
  if (sort === 'asc' || sort === 'desc') {
    sql += ` ORDER BY p.price ${sort.toUpperCase()}`;
  }

  try {
    console.log('SQL:', sql);
    console.log('Params:', params);

    const [rows] = await db.query<RowDataPacket[]>(sql, params);
    res.json({ rows });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};


// Get a specific product
export const fetchProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const sql = `
      SELECT 
        p.products_id AS product_id,
        p.title AS product_title,
        p.description AS product_description,
        p.stock AS product_stock,
        p.price AS product_price,
        p.image AS product_image,
        p.created_date AS product_created_date,
        c.categories_id AS category_id,
        c.name AS category_name
      FROM products p
      LEFT JOIN product_categories pc ON p.products_id = pc.product_id
      LEFT JOIN categories c ON pc.category_id = c.categories_id
      WHERE p.products_id = ?
    `;

    const [rows] = await db.query<IProductsDBResponse[]>(sql, [id]);
    const product = rows[0];

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(formatProduct(rows));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

const formatProduct = (rows: IProductsDBResponse[]) => ({
  id:          rows[0].product_id,
  title:       rows[0].product_title,
  description: rows[0].product_description,
  stock:       rows[0].product_stock,
  price:       rows[0].product_price,
  image:       rows[0].product_image,
  created_at:  rows[0].product_created_date,
  categories:  rows
    .filter(row => row.category_id !== null) // om en produkt inte har någon kategori
    .map((row) => ({
      id:   row.category_id,
      name: row.category_name,
    }))
});


// Create a product
export const createProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, description, stock, price, image } = req.body;
 
    if (!title || !description || !stock || !price || !image) {
    res.status(400).json({error: 'Title, description, stock, price and image is required'}) 
    return; 
  }

  try {
    const sql = `
      INSERT INTO products (title, description, stock, price, image)
      VALUES (?, ?, ?, ?, ?)
    `
    const [result] = await db.query<ResultSetHeader>(sql, [title, description, stock, price, image])
    res.status(201).json({message: 'Product is created', id: result.insertId})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, description, stock, price, image } = req.body;

    if (!title || !description || !stock || !price || !image) {
        res.status(400).json({ error: 'Title, description, stock, price and image is required' });
        return;
      }

    try {
    const sql = `
        UPDATE products 
        SET title = ?, description = ?, stock = ?, price = ?, image = ?
        WHERE products_id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(sql, [
        title,
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
      WHERE products_id = ?
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