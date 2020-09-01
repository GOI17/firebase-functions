const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const product_routes = require('./routes/product.routes');

const app = express();

app.use(product_routes);

exports.app = functions.https.onRequest(app);
