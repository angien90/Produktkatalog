import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ICategoriesDBResponse } from "../models/ICategoriesDBResponse";

// Get all categories
export const fetchAllCategories = async (req: Request, res: Response) => {
  const search = req.query.search?.toString();
  const sort = req.query.sort?.toString()?.toLowerCase(); // asc eller desc

  let sql = 'SELECT * FROM categories';
  const params: any[] = [];

  try {
    // Lägg till sökfilter
    if (search) {
      sql += ' WHERE name LIKE ?';
      params.push(`%${search}%`);
    }

    // Lägg till sortering
    if (sort === 'asc' || sort === 'desc') {
      sql += ` ORDER BY name ${sort.toUpperCase()}`;
    }

    console.log('SQL:', sql);
    console.log('Params:', params);

    const [rows] = await db.query<RowDataPacket[]>(sql, params);
    res.json({ rows });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};


// Get a specific category
export const fetchCategory = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const sql = `
      SELECT 
        p.categories_id AS category_id,
        p.title AS category_title,
        p.description AS category_description,
        p.stock AS category_stock,
        p.price AS category_price,
        p.image AS category_image,
        p.created_date AS category_created_date,
        c.categories_id AS category_id,
        c.name AS category_name
      FROM categories p
      LEFT JOIN category_categories pc ON p.categories_id = pc.category_id
      LEFT JOIN categories c ON pc.category_id = c.categories_id
      WHERE p.categories_id = ?
    `;

    const [rows] = await db.query<ICategoriesDBResponse[]>(sql, [id]);
    const category = rows[0];

    if (!category) {
      res.status(404).json({ message: 'category not found' });
      return;
    }

    res.json(formatCategory(rows));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

const formatCategory = (rows: ICategoriesDBResponse[]) => ({
  id:          rows[0].category_id,
  title:       rows[0].category_title,
  description: rows[0].category_description,
  stock:       rows[0].category_stock,
  price:       rows[0].category_price,
  image:       rows[0].category_image,
  created_at:  rows[0].category_created_date,
  categories:  rows
    .filter(row => row.category_id !== null) // om en produkt inte har någon kategori
    .map((row) => ({
      id:   row.category_id,
      name: row.category_name,
    }))
});

// Get all products in a specific categories
export const fetchProductsByCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
  
    try {
      const sql = `
        SELECT p.*
        FROM products p
        JOIN product_categories pc ON p.products_id = pc.product_id
        WHERE pc.category_id = ?
        `;
        
      const [rows] = await db.query<RowDataPacket[]>(sql, [categoryId]);
  
      res.json(rows);
    } catch (error: unknown) {
      console.error('Error fetching products by category:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  };
  
// Create a category
export const createCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name } = req.body;
 
    if (!name) {
    res.status(400).json({error: 'Category name is required'}) 
    return; 
  }

  try {
    const sql = `
      INSERT INTO categories (name)
      VALUES (?)
    `
    const [result] = await db.query<ResultSetHeader>(sql, [name])
    res.status(201).json({message: 'category is created', id: result.insertId})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
      }

    try {
    const sql = `
        UPDATE categories 
        SET name = ?
        WHERE categories_id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(sql, [
        name,
        id
    ]);

    if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Category could not be updated' });
        return;
    }

    res.json({ message: 'category updated' });
    } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
    }
}

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const sql = `
      DELETE FROM categories
      WHERE categories_id = ?
    `
    const [result] = await db.query<ResultSetHeader>(sql, [id])
    if (result.affectedRows === 0) {
      res.status(404).json({message: 'category not found'})
      return;
    }
    res.json({message: 'category deleted'})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}