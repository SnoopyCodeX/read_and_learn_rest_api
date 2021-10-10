import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import routes from './api/routes/app-routes.js';
dotenv.config();

const app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
routes(app);

app.use((req, res) => res.status(404).send(`Route: ${req.originalUrl} was not found!`));

app.listen(port);