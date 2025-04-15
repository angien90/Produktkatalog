export class Products {
    id: number = 0; 
    titel: string = "";
    description: string = "";
    stock: number = 0;
    price: number = 0;
    image: string = "";

    constructor (titel: string, description: string, stock: number, price: number, image: string) {
       this.id = Math.round(Math.random() * 1000);
       this.titel = titel;
       this.description = description; 
       this.stock = stock;
       this.price = price;
       this.image = image;
    }
}