import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IGendersDBResponse } from '../models/IGenderDBResponse';

// Get all genders
export const fetchAllGenders = async (req: Request, res: Response) => {
  const search = req.query.search?.toString();
  const sort = req.query.sort?.toString()?.toLowerCase(); // asc eller desc

  let sql = 'SELECT * FROM genders';
  const params: any[] = [];

  try {
    // Lägg till sökfilter
    if (search) {
      sql += ' WHERE gender LIKE ?';
      params.push(`%${search}%`);
    }

    // Lägg till sortering
    if (sort === 'asc' || sort === 'desc') {
      sql += ` ORDER BY gender ${sort.toUpperCase()}`;
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


// Get a specific gender
export const fetchGender = async (req: Request, res: Response) => {
    const id = req.params.id;
  
    try {
      const sql = `
        SELECT genders_id AS id, gender
        FROM genders
        WHERE genders_id = ?
      `;
  
      const [rows] = await db.query<IGendersDBResponse[]>(sql, [id]);
      const gender = rows[0];
  
      if (!gender) {
        res.status(404).json({ message: 'Gender not found' });
        return;
      }
  
      res.json(gender);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  };


// Get all products in a specific genders
export const fetchProductsByGender = async (req: Request, res: Response) => {
  const genderId = req.query.gender?.toString(); // Hämta kön från query-parametrar istället för URL-parametrar

  if (!genderId) {
    res.status(400).json({ message: "Gender parameter is required" });
    return;
  }

  try {
    const sql = `
      SELECT p.*
      FROM products p
      JOIN product_gender pg ON p.products_id = pg.products_id
      WHERE pg.genders_id = ?
    `;
    const [rows] = await db.query<RowDataPacket[]>(sql, [genderId]);

    if (rows.length === 0) {
      res.status(404).json({ message: "No products found for the selected gender" });
      return;
    }

    res.json(rows);
  } catch (error: unknown) {
    console.error('Error fetching products by gender:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};
  
// Create a gender
export const createGender = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { gender } = req.body;
 
    if (!gender) {
    res.status(400).json({error: 'gender gender is required'}) 
    return; 
  }

  try {
    const sql = `
      INSERT INTO genders (gender)
      VALUES (?)
    `
    const [result] = await db.query<ResultSetHeader>(sql, [gender])
    res.status(201).json({message: 'gender is created', id: result.insertId})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

// Update a gender
export const updateGender = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { gender } = req.body;

    if (!gender) {
        res.status(400).json({ error: 'gender is required' });
        return;
      }

    try {
    const sql = `
        UPDATE genders 
        SET gender = ?
        WHERE genders_id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(sql, [
        gender,
        id
    ]);

    if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Gender could not be updated' });
        return;
    }

    res.json({ message: 'gender updated' });
    } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
    }
}

// Delete a gender
export const deleteGender = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const sql = `
      DELETE FROM genders
      WHERE genders_id = ?
    `
    const [result] = await db.query<ResultSetHeader>(sql, [id])
    if (result.affectedRows === 0) {
      res.status(404).json({message: 'gender not found'})
      return;
    }
    res.json({message: 'gender deleted'})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}