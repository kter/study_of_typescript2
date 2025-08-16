import { Library } from "../library.ts";
import { Book, PercentageDiscount, ThresholdDiscount, CompositeDiscount } from "../book.ts";
import { describe, expect, it } from "vitest";

describe("Library", () => {
  it("should return the total price of the books", () => {
    const library1 = new Library();
    library1.addBook(new Book("坊っちゃん", "夏目漱石", 880));
    library1.addBook(new Book("吾輩は猫である", "夏目漱石", 1200));
    expect(library1.totalWith(new CompositeDiscount([new PercentageDiscount(0.2)]))).toBe(1664);

    const library2 = new Library();
    library2.addBook(new Book("坊っちゃん", "夏目漱石", 880));
    expect(library2.totalWith(new CompositeDiscount([new PercentageDiscount(0.2)]))).toBe(704);

    const library3 = new Library();
    expect(library3.totalWith(new CompositeDiscount([new PercentageDiscount(0.2), new ThresholdDiscount(1000, 200)]))).toBe(0);
  })
})