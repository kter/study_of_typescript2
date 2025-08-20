import { Book, DiscountPolicy, PercentageDiscount } from "./book.ts";
import { promises as fs } from "node:fs";
import * as path from "node:path";

export class Library {
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

  listBooks(): Book[] {
    return this.books;
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

  totalWith(policy: DiscountPolicy): number {
    return this.books.reduce((total, book) => total + book.priceWith(policy), 0);
  }

  totalOnTotalWith(policy: DiscountPolicy): number {
    return policy.apply(this.books.reduce((total, book) => total + book.price, 0));
  }

  async saveToFile(filename: string): Promise<boolean> {
    const json = JSON.stringify(this.books);
    try {
      await fs.writeFile(filename, json);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async loadFromFile(filename: string): Promise<boolean> {
    this.books = [];
    this.index.clear();
    try {
      const json = await fs.readFile(filename, "utf-8");
      const books = JSON.parse(json);
      books.map(
        (book: any) => this.addBook(new Book(book.title, book.author, book.price))
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  
}
