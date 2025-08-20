import { Library } from "../library.ts";
import { Book, PercentageDiscount, ThresholdDiscount, CompositeDiscount } from "../book.ts";
import { describe, expect, it } from "vitest";

describe("Library", () => {
  it ("should return Error when adding duplicate book", () => {
    const library = new Library();
    library.addBook(new Book("坊っちゃん", "夏目漱石", 880));
    expect(() => library.addBook(new Book("坊っちゃん", "夏目漱石", 880))).toThrow();
  });

  it("should return the book list", () => {
    const library = new Library();
    library.addBook(new Book("坊っちゃん", "夏目漱石", 880));
    library.addBook(new Book("吾輩は猫である", "夏目漱石", 1200));
    expect(library.listBooks()).toEqual([
      {
        title: "坊っちゃん",
        author: "夏目漱石",
        price: 880
      },
      {
        title: "吾輩は猫である",
        author: "夏目漱石",
        price: 1200
      }
    ]);
  });

  it("should return the total price of the books", () => {
    const library1 = new Library();
    library1.addBook(new Book("坊っちゃん", "夏目漱石", 880));
    library1.addBook(new Book("吾輩は猫である", "夏目漱石", 1200));
    expect(
      library1.totalWith(new CompositeDiscount([new PercentageDiscount(0.2)]))
    ).toBe(1664);

    const library2 = new Library();
    library2.addBook(new Book("坊っちゃん", "夏目漱石", 880));
    expect(
      library2.totalWith(new CompositeDiscount([new PercentageDiscount(0.2)]))
    ).toBe(704);

    const library3 = new Library();
    expect(
      library3.totalWith(
        new CompositeDiscount([
          new PercentageDiscount(0.2),
          new ThresholdDiscount(1000, 200),
        ])
      )
    ).toBe(0);
  });

  it("should return difference between totalWith and totalOnTotalWith", () => {
    const library = new Library();
    library.addBook(new Book("坊っちゃん", "夏目漱石", 880));
    library.addBook(new Book("吾輩は猫である", "夏目漱石", 1200));
    expect(
      library.totalWith(
        new CompositeDiscount([
          new PercentageDiscount(0.1),
          new ThresholdDiscount(1500, 200),
        ])
      )
    ).toBe(1872);
    expect(
      library.totalOnTotalWith(
        new CompositeDiscount([
          new PercentageDiscount(0.1),
          new ThresholdDiscount(1500, 200),
        ])
      )
    ).toBe(1672);
  });

  it("should save and load from file", async () => {
    const lib = new Library();
    lib.addBook(new Book("A", "X", 1000));
    lib.addBook(new Book("B", "Y", 1200));

    await lib.saveToFile("/tmp/lib.json");

    const lib2 = new Library();
    const loaded = await lib2.loadFromFile("/tmp/lib.json");
    expect(lib2.findByAuthor("X")[0]?.title).toBe("A");
  });
});