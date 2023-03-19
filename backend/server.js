const app = require('./app');

const port = process.env.PORT;

app.listen('0.0.0.0:$PORT');
