import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';

const app = express();

// Parse incoming request data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});