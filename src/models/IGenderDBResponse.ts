import { RowDataPacket } from "mysql2";

export interface IGendersDBResponse extends RowDataPacket{
  gender_id: number
  gender_gender: string
}