import { Library } from "./library.ts";
import { Book, PercentageDiscount, ThresholdDiscount, CompositeDiscount } from "./book.ts";
import type { DiscountPolicy } from "./book.ts";

class cli {
    static dbFilename: string = "library.json";

    constructor() {
        console.log("cli");
    }

    static async add(title: string, author: string, price: number) {
        let library = new Library();
        await library.loadFromFile(cli.dbFilename);
        library.addBook(new Book(title, author, price));
        await library.saveToFile(cli.dbFilename);
    }

    static async list() {
        const library = new Library();
        await library.loadFromFile(cli.dbFilename);
        library.listBooks().forEach(book => {
            console.log(book.getInfo());
        });
    }
    static async total(mode: string, rate: number, threshold: number, amount: number) {
        const library = new Library();
        await library.loadFromFile(cli.dbFilename);
        let total = 0;

        const policies: DiscountPolicy[] = [];
        if (Number.isFinite(rate) && rate > 0) {
            policies.push(new PercentageDiscount(rate));
        }
        if (Number.isFinite(threshold) && Number.isFinite(amount) && threshold >= 0 && amount >= 0) {
            policies.push(new ThresholdDiscount(threshold, amount));
        }


       if (mode === "per-item") {
        total = library.totalWith(new CompositeDiscount(policies));
       } else if (mode === "on-total") {
        total = library.totalOnTotalWith(new CompositeDiscount(policies));
       }

        console.log("total:", total);
    }
}

const cmd = process.argv[2];
const getArg = (name: string, fallback?: string): string | undefined => {
    const index = process.argv.indexOf(`--${name}`);
    return index !== -1 ? process.argv[index + 1] : fallback;
}

const processCmd = async () => {
    cli.dbFilename = getArg("db") || cli.dbFilename;
    switch (cmd) {
        case "add":
            const title = getArg("title");
            const author = getArg("author");
            const price = Number(getArg("price"));
            if (!title || !author || isNaN(price)) {
                console.error("title, author, price are required");
                process.exit(1);
            }
            await cli.add(title, author, price);
            break;
        case "list":
            await cli.list();
            break;
        case "total":
            const mode = getArg("mode");
            if (!mode || mode !== 'per-item' && mode !== 'on-total') {
                console.error("mode must be per-item or on-total");
                process.exit(1);
            }
            const percent = Number(getArg("percent"));
            const threshold = Number(getArg("threshold"));
            const amount = Number(getArg("amount"));
            if (isNaN(percent) && (isNaN(threshold) || isNaN(amount))) {
                console.error("percent or threshold and amount must be numbers");
                process.exit(1);
            }
            const rate = percent > 1 ? percent / 100 : percent;
            await cli.total(mode, rate, threshold, amount);
            break;
        default:
            console.error("invalid command");
            process.exit(1);
    }
}

processCmd();