import { Book } from "./book.ts";

class Library {
  books: Book[] = [];

  addBook(book: Book): void {
    if (this.hasBook(book.title, book.author)) {
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

  findByTitle(title: string): Book[] {
    return this.books.filter(book => (book.title === title));
  }

  hasBook(title: string, author: string): boolean {
    return this.books.some( b => b.title === title && b.author === author);
  }

  removeBook(title: string, author: string): boolean {
    if (!this.hasBook(title, author)) {
      return false;
    }
    this.books = this.books.filter( b => !(b.title === title && b.author === author))
    return true;
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

console.log(library.hasBook("坊っちゃん", "夏目漱石"));
console.log(library.hasBook("坊っちゃん2", "夏目漱石"));

library.listBooks();
console.log(library.removeBook("坊っちゃん", "夏目漱石"));
library.listBooks();
console.log(library.removeBook("坊っちゃん", "夏目漱石"));
library.addBook(new Book("坊っちゃん", "夏目漱石", 880));