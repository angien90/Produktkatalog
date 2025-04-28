import { RowDataPacket } from "mysql2";

export interface ICategoriesDBResponse extends RowDataPacket{
  category_id: number
  category_name: string
}