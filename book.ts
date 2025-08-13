export class Book {

  title: string;
  author: string;
  price: number;

  constructor(title: string, author: string, price: number) {
    this.title = title;
    this.author = author;
    this.price = price;
    if (!this.assertValidPrice()) {
      throw new Error("price must be greater than or equal to 0");
    }
  }

  getInfo() {
    return `タイトル: ${this.title}, 著者: ${this.author}, 価格: ${this.price}円`;
  }

  getDiscountedPrice(rate: number) {
    return Math.floor(this.price * (1 - rate));
  }

  private assertValidPrice() {
    return this.price >= 0 && Number.isInteger(this.price);
  }
}

const book = new Book("坊ちゃん", "夏目漱石", 880);
console.log(book.getInfo());
console.log(book.getDiscountedPrice(0.2));
