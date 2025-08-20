import { describe, expect, it } from "vitest";
import { Book, PercentageDiscount, ThresholdDiscount, CompositeDiscount } from "./book.ts";

describe("Book", () => {
  it("should return the book info", () => {
    const book = new Book("坊っちゃん", "夏目漱石", 880);
    expect(book.getInfo()).toBe(
      "タイトル: 坊っちゃん, 著者: 夏目漱石, 価格: 880円"
    );

    const book2 = new Book("吾輩は猫である", "夏目漱石", 1200);
    expect(book2.getInfo()).toBe(
      "タイトル: 吾輩は猫である, 著者: 夏目漱石, 価格: 1200円"
    );
  });

  it("should return percentage discount", () => {
    const book = new Book("坊っちゃん", "夏目漱石", 880);
    expect(book.getDiscountedPrice(0.2)).toBe(704);
  });

  it("should return threshold discount", () => {
    const book = new Book("坊っちゃん", "夏目漱石", 880);
    expect(book.priceWith(new ThresholdDiscount(1000, 200))).toBe(880);

    const book2 = new Book("吾輩は猫である", "夏目漱石", 1200);
    expect(book2.priceWith(new ThresholdDiscount(1000, 200))).toBe(1000);
  });

  it("should return composite discount", () => {
    const book1 = new Book("坊っちゃん", "夏目漱石", 880);
    expect(
      book1.priceWith(
        new CompositeDiscount([
          new PercentageDiscount(0.2),
          new ThresholdDiscount(1000, 200),
        ])
      )
    ).toBe(704);
  });

  const book2 = new Book("吾輩は猫である", "夏目漱石", 1200);
  expect(
    book2.priceWith(
      new CompositeDiscount([
        new ThresholdDiscount(1000, 200),
        new PercentageDiscount(0.2),
      ])
    )
  ).toBe(800);
  expect(
    book2.priceWith(
      new CompositeDiscount([
        new PercentageDiscount(0.2),
        new ThresholdDiscount(1000, 200),
      ])
    )
  ).toBe(960);
});
