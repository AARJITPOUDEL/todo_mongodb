// server.js

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB database
mongoose.connect("mongodb://localhost/todo_app", { useNewUrlParser: true });

// Define a schema for the products
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

// Compile a model for the products
const Product = mongoose.model("Product", productSchema);

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to the TODO app!");
});

// Add a new product
app.post("/products", (req, res) => {
  const { name, description, price } = req.body;

  const product = new Product({
    name,
    description,
    price,
  });

  product.save((err, product) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(product);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
