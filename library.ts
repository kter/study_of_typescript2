import { Book } from "./book.ts";

class Library {
  private books: Book[] = [];
  private index = new Set<string>();

  private key(title: string, author: string): string {
    return `${title}|${author}`;
  }

  addBook(book: Book): void {
    const k = this.key(book.title, book.author);

    if (this.index.has(k)) {
      console.warn("タイトルと著者が重複しています");
      throw new Error("Duplicate book");
    }
    this.books.push(book);
    this.index.add(k);
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
    return this.index.has(this.key(title, author));
  }

  removeBook(title: string, author: string): boolean {
    const k = this.key(title, author);
    if (!this.index.has(k)) return false;

    const idx = this.books.findIndex(
      (b) => b.title === title && b.author === author
    );

    if (idx === -1) {
      // インデックスと配列が何らかの理由で不整合になった場合の保険
      this.index.delete(k);
      return false;
    }
    this.books.splice(idx, 1);
    this.index.delete(k);
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