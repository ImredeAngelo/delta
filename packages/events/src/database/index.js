module.exports = {
    connect: require('./connect'),
	execute: require('./execute'),
    transaction: async (name) => {
        const transaction = await this.connect();
        transaction.beginTransaction();
    },
    commit: () => execute("COMMIT"),
    rollback: () => execute("ROLLBACK"),
}
