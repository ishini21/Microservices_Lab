const express = require("express");
const app = express();

app.use(express.json());

let orders = [];
let idCounter = 1;

// GET /orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// POST /orders  body: { "item": "Laptop", "quantity": 2, "customerId": "C001" }
app.post("/orders", (req, res) => {
  const { item, quantity, customerId } = req.body || {};
  if (!item || !quantity || !customerId) {
    return res.status(400).json({ message: "item, quantity, customerId are required" });
  }

  const order = { id: idCounter++, item, quantity, customerId, status: "PENDING" };
  orders.push(order);
  res.status(201).json(order);
});

// GET /orders/:id
app.get("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = orders.find(o => o.id === id);
  if (!found) return res.status(404).json({ message: "Not found" });
  res.json(found);
});

const PORT = 8082;
app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));