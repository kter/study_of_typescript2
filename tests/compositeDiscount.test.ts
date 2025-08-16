import { Book, CompositeDiscount, PercentageDiscount, ThresholdDiscount } from "../book.ts";
import { describe, expect, it } from "vitest";

describe("CompositeDiscount", () => {
  it("should apply all policies", () => {
    const p20 = new PercentageDiscount(0.2);
    const th = new ThresholdDiscount(900, 100);
    const combo1 = new CompositeDiscount([p20, th]);
    const b1 = new Book("坊っちゃん", "夏目漱石", 1000);
    expect(b1.priceWith(combo1)).toBe(800);

    const combo2 = new CompositeDiscount([th, p20]);
    const b2 = new Book("坊っちゃん", "夏目漱石", 1000);
    expect(b2.priceWith(combo2)).toBe(720);

    try {
        new Book("坊っちゃん", "夏目漱石", -100);
    } catch (e) {
        expect(e).toBeInstanceOf(Error);
    }
  })
})
