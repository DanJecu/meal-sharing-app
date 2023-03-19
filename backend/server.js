const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Backend api available at ${process.env.API_PATH}`);
});
