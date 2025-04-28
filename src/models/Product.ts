export class Product {
    id: number = 0; 
    title: string = "";
    description: string = "";
    stock: number = 0;
    price: number = 0;
    image: string = "";

    constructor (title: string, description: string, stock: number, price: number, image: string) {
       this.id = Math.round(Math.random() * 1000);
       this.title = title;
       this.description = description; 
       this.stock = stock;
       this.price = price;
       this.image = image;
    }
}