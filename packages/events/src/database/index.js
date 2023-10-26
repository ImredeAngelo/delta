module.exports = {
    connect: require('./connect'),
	execute: require('./execute'),
    // TODO:
    transaction: async (name) => {
        const transaction = await this.connect();
        transaction.beginTransaction();
    },
    commit: () => this.execute("COMMIT"),
    rollback: () => this.execute("ROLLBACK"),
}
