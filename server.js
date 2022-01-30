const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(express.json());

mongoose.connect(
    process.env.MONGODB_URL || "mongodb://localhost/shopping-cart-db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

const Product = mongoose.model("products", new mongoose.Schema({
    _id : {type: String, default: shortid.generate},
    title: String,
    image: String,
    description: String,
    price: Number,
    avilableSizes : [String],
    })
);

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});    //we have to use async await because Product.find() is a promise cause its slow probably
    res.send(products);
})

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
  });
  
app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server at port " + port));