const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const db = {
  products: [
    {
      id: 1,
      name: "baraa1",
      count: 15,
    },
    {
      id: 2,
      name: "baraa2",
      count: 15,
    },
    {
      id: 3,
      name: "baraa3",
      count: 15,
    },
    {
      id: 4,
      name: "baraa1",
      count: 15,
    },
  ],
  orders: [
    {
      orderId: 1,
      productId: 1,
      count: 1,
      userId: 1,
    },
  ],
  users: [
    {
      userId: 1,
      name: "lhagva",
    },
    {
      userId: 2,
      name: "bataa",
    },
  ],
};

app.use(bodyParser.json());

app.get("/product", (req, res) => {
  res.status(200).json(db.products);
});
app.get("/order", (req, res) => {
  res.status(200).json(db.orders);
});

app.use((req, res, next) => {
  console.log("huselt orj irlee");
  next();
});

app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const product = db.products.find((item) => item.id == id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400).json({ message: "product not found" });
  }
});

///userId, productId, count

const checkUser = (req, res, next) => {
  const { userId } = req.body;
  console.log(userId);
  const user = db.users.find((el) => el.userId == userId);
  if (user) {
    next();
  } else {
    res.status(400).json({ message: "baihgui hereglegch bnaa" });
  }
};

app.post("/order", checkUser, async (req, res) => {
  const { userId, count, productId } = req.body;
  db.orders.push({
    userId,
    count,
    productId,
  });
  res.end();
});

app.get("/order/:id", (req, res) => {
  const { id } = req.params;
  const order = db.orders.find((item) => item.id == id);
  if (order) {
    res.status(200).json(productId);
  } else {
    res.status(400).json({ message: "product not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
