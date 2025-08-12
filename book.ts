export class Book {

  title: string;
  author: string;
  price: number;

  constructor(title: string, author: string, price: number) {
    this.title = title;
    this.author = author;
    this.price = price;
  }

  getInfo() {
    return `タイトル: ${this.title}, 著者: ${this.author}, 価格: ${this.price}円`;
  }

  getDiscountedPrice(rate: number) {
    return Math.floor(this.price * (1 - rate));
  }
}

const book = new Book("坊ちゃん", "夏目漱石", 880);
console.log(book.getInfo());
console.log(book.getDiscountedPrice(0.2));
