export interface DiscountPolicy {
  apply(price: number): number;
}

export class CompositeDiscount implements DiscountPolicy {
  private readonly policies: DiscountPolicy[];

  constructor(policies: DiscountPolicy[]) {
    this.policies = policies;
  }

  apply(price: number): number {
    if (price < 0) 
      throw new Error("price must be greater than or equal to 0")
    return this.policies.reduce((p, policy) => policy.apply(p), price);
  }
}
export class PercentageDiscount implements DiscountPolicy {
  private rate: number;

  constructor(rate: number) {
    if (!(rate >= 0 && rate <= 1))
      throw new Error("rate must be between 0 and 1");
    this.rate = rate;
  }

  apply(price: number): number {
    if (price < 0)
      throw new Error("price must be greater than or equal to 0");
    return price * (1 - this.rate);
  }
}

export class ThresholdDiscount implements DiscountPolicy {
  private threshold: number;
  private amountOff: number;

  constructor(threshold: number, amountOff: number) {
    if (threshold < 0 || amountOff < 0)
      throw new Error("threshold or amountOff must be greater than 0");
    if (amountOff > threshold)
      throw new Error("amountOff must be less than or equal to threshold");
    this.threshold = threshold;
    this.amountOff = amountOff;
  }

  apply(price: number): number {
    if (price < 0)
      throw new Error("price must be greater than or equal to 0");
    if (price < this.threshold) {
      return price;
    }
    return price - this.amountOff;
  }
}

export class Book {

  title: string;
  author: string;
  price: number;

  constructor(title: string, author: string, price: number) {
    this.title = title;
    this.author = author;
    this.price = price;
    if (!this.assertValidPrice()) {
      throw new Error("price must be greater than or equal to 0");
    }
  }

  priceWith(policy: DiscountPolicy): number {
    return Math.floor(policy.apply(this.price));
  }

  getInfo() {
    return `タイトル: ${this.title}, 著者: ${this.author}, 価格: ${this.price}円`;
  }

  getDiscountedPrice(rate: number) {
    return Math.floor(this.price * (1 - rate));
  }

  private assertValidPrice() {
    return this.price >= 0 && Number.isInteger(this.price);
  }
}

const book = new Book("坊ちゃん", "夏目漱石", 880);
console.log(book.getInfo());
console.log(book.getDiscountedPrice(0.2));

const b1 = new Book("坊っちゃん", "夏目漱石", 880);
const b2 = new Book("吾輩は猫である", "夏目漱石", 1200);
const p20 = new PercentageDiscount(0.2);
const th = new ThresholdDiscount(1000, 200);

console.log(b1.priceWith(p20));
console.log(b2.priceWith(p20));
console.log(b1.priceWith(th));
console.log(b2.priceWith(th));

const combo = new CompositeDiscount([
  new PercentageDiscount(0.2),
  new ThresholdDiscount(1000, 200),
])

console.log(b1.priceWith(combo));
console.log(b2.priceWith(combo));