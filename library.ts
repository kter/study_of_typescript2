import { Book } from "./book.ts";

class Library {
  books: Book[];

  constructor() {
    this.books = [];
  }

  addBook(book: Book): void {
    if (this.books.some(b => b.title === book.title && b.author === book.author)) {
      console.warn("タイトルと著者が重複しています");
      throw new Error("Duplicate book");
    }
    this.books.push(book);
  }

  listBooks(): void {
    this.books.forEach((book) => console.log(book.getInfo()));
  }

  findByAuthor(author: string): Book[] {
    return this.books.filter(book => (book.author === author));
  }
}

const library = new Library();
library.addBook(new Book("坊っちゃん", "夏目漱石", 880));
library.addBook(new Book("吾輩は猫である", "夏目漱石", 1200));
library.addBook(new Book("走れメロス", "太宰治", 900));

library.listBooks();
console.log(library.findByAuthor("夏目漱石").length);

try {
  library.addBook(new Book("坊っちゃん", "夏目漱石", 880));
} catch (e) {
  console.log("重複チェックOK")
}