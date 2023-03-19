const app = require('./app');

const port = parseInt(process.env.PORT, 10) || process.env.PGPORT;

app.listen('0.0.0.0:$PORT', () => {
    console.log(`Backend api available at ${process.env.API_PATH}`);
});
