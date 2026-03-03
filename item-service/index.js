const express = require("express");
const app = express();

app.use(express.json());

// In-memory list
let items = ["Book", "Laptop", "Phone"];

// GET /items
app.get("/items", (req, res) => {
  res.json(items.map((name, id) => ({ id, name })));
});

// POST /items  body: { "name": "Headphones" }
app.post("/items", (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ message: "name is required" });

  items.push(name);
  res.status(201).json({ message: `Item added: ${name}`, id: items.length - 1, name });
});

// GET /items/:id
app.get("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id < 0 || id >= items.length) return res.status(404).json({ message: "Not found" });
  res.json({ id, name: items[id] });
});

const PORT = 8081;
app.listen(PORT, () => console.log(`Item service running on port ${PORT}`));