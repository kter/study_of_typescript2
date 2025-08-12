var Book = /** @class */ (function () {
    function Book(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
    Book.prototype.getInfo = function () {
        return "\u30BF\u30A4\u30C8\u30EB: ".concat(this.title, " \u8457\u8005: ").concat(this.author, " \u4FA1\u683C: ").concat(this.price, "\u5186");
    };
    return Book;
}());
var book = new Book("坊ちゃん", "夏目漱石", 880);
console.log(book.getInfo());
