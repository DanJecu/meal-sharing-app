const app = require('./app');

const port = parseInt(process.env.PORT, 10) || process.env.PGPORT;

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Backend api available at ${process.env.API_PATH}`);
});
