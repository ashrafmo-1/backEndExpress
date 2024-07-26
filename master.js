const express = require("express");
const app = express();
var cors = require('cors')
require('dotenv').config()
const mongoose = require("mongoose");
const url = process.env.MONGO_DB_URL;
// all routes
const usersRouter = require("./routes/users.route");
const productsRouter = require("./routes/products.route");


mongoose.connect(url).then(() => {
  console.log("Connect success for DB");
}).catch(err =>  console.log(err));

app.use(cors())
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

//! not implemented yet;
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((error, res) => {
  res.status(error.statusCode || 500).json({
    code: error.statusCode || 500,
    message: error.statusText || 'invalid status',
    error: error.message || 'invalid status',
    data: null
  });
})

app.listen(process.env.PORT);