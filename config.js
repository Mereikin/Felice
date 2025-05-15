const config = {
    port: process.env.PORT || 3000,
    dbPath: './scripts/debts.json',
    corsOptions: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
};

module.exports = config;
