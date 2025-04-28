// För korrekt Typescript 
import { RowDataPacket } from "mysql2";

export interface IProducts extends RowDataPacket{
    id: number; 
    title: string;
    description: string;
    stock: number;
    price: number;
    image: string;
}