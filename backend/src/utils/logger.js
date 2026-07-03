class Logger {

    info(title, data = {}) {

        console.log("\n====================================");
        console.log(`📌 ${title}`);
        console.table(data);
        console.log("====================================\n");

    }

    error(title, error) {

        console.log("\n====================================");
        console.error(`❌ ${title}`);
        console.error(error);
        console.log("====================================\n");

    }

}

module.exports = new Logger();