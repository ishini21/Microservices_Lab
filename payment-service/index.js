const express = require("express");
const app = express();

app.use(express.json());

let payments = [];
let idCounter = 1;

// GET /payments
app.get("/payments", (req, res) => {
  res.json(payments);
});

// POST /payments/process  body: { "orderId": 1, "amount": 1299.99, "method": "CARD" }
app.post("/payments/process", (req, res) => {
  const { orderId, amount, method } = req.body || {};
  if (orderId == null || amount == null || !method) {
    return res.status(400).json({ message: "orderId, amount, method are required" });
  }

  const payment = { id: idCounter++, orderId, amount, method, status: "SUCCESS" };
  payments.push(payment);
  res.status(201).json(payment);
});

// GET /payments/:id
app.get("/payments/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = payments.find(p => p.id === id);
  if (!found) return res.status(404).json({ message: "Not found" });
  res.json(found);
});

const PORT = 8083;
app.listen(PORT, () => console.log(`Payment service running on port ${PORT}`));