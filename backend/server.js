const app = require('./app');

const port = parseInt(process.env.PORT, 10) || process.env.PGPORT;

app.listen(
    /* port,  */ () => {
        console.log(`Backend api available at ${process.env.API_PATH}`);
    }
);
