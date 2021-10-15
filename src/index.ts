const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

import { productModel, productModel } from "../models/products";
import { userModel } from "../models/users";
import { orderModel } from "../models/orders";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";

app.use(bodyParser.json());

const url = "mongodb+srv://admin:baatar123@cluster0.sn8ta.mongodb.net/Amazon";

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => console.log("connected"));
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// Add Product
app.post("/addProduct", async (req, res) => {
  const { product, price } = req.body;
  const addProduct = new productModel();
  addProduct.name = product;
  addProduct.price = price;
  await addProduct.save();
  res.status(200).json(addProduct);
});

// All products
app.get("/products", async (req, res) => {
  const allProduct = await productModel.find();
  res.status(200).json(allProduct);
});

// Add user
app.post("/addUser", async (req, res) => {
  const { username } = req.body;
  const newUser = new userModel();
  newUser.username = username;
  await newUser.save();
  res.status(200).json(newUser);
});

// create order
app.post("/order", async (req, res) => {
  const { user, product, amount, price } = req.body;
  const order = await new orderModel();
  order.user = user;
  order.product = product;
  order.price = price;
  order.numberOfProducts = amount;

  await order.save();
  res.status(200).json(order);
});

// agrigation items

app.get("/mostSoldItem", async (req, res) => {
  const mostSoldItem = await orderModel.aggregate([
    {
      $group: {
        _id: "",
        totalSaleAmount: { $sum: { $multiply: ["number", "price"] } },
      },
    },
    { $limit: 1 },
  ]);
  res.status(200).json(mostSoldItem);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await new userModel();
  user.email = email;

  await bcrypt.hash(password, 10).then(function (hash) {
    user.password = hash;
  });

  await user.save();

  res.status(200).json(user);
});

app.post("/check", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    $match: [{ email: email }],
  });
  console.log(user);
  if (user) {
    bcrypt.compare(password, user.password).then(function (result) {
      res.send(result);
    });
  }
});
