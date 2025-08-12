class Book {

  title: string;
  author: string;
  price: number;

  constructor(title: string, author: string, price: number) {
    this.title = title;
    this.author = author;
    this.price = price;
  }

  getInfo() {
    return `タイトル: ${this.title} 著者: ${this.author} 価格: ${this.price}円`;
  }
}

const book = new Book("坊ちゃん", "夏目漱石", 880);
console.log(book.getInfo());
