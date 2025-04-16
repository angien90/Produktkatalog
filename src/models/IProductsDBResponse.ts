import { RowDataPacket } from "mysql2";

export interface IProductsDBResponse extends RowDataPacket{
  product_id: number
  product_title: string
  product_description: string
  product_stock: number
  product_price: number
  product_image: string
  product_created_at: string
  category_id: number
  category_name: string
}