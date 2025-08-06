import express from 'express';
import Product from '../models/Product.js';
import verifyToken from '../middleware/authMiddleware.js'; // 🔐 Import your auth middleware

const router = express.Router();

// 🔓 Public - anyone can view all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 🔓 Public - anyone can view one product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// 🔒 Protected - only logged-in users can create product
router.post('/', verifyToken, async (req, res) => {
    console.log("🔥 POST /api/products route hit");
  
    const { name, price, description, stock } = req.body;
    const product = await Product.create({ name, price, description, stock });
    res.status(201).json(product);
  });
// 🔒 Protected - only logged-in users can update product
router.put('/:id', verifyToken, async (req, res) => {
  const { name, price, description, stock } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.description = description ?? product.description;
  product.stock = stock ?? product.stock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// 🔒 Protected - only logged-in users can delete product
router.delete('/:id', verifyToken, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  await product.deleteOne();
  res.json({ message: "Product deleted successfully" });
});

export default router;
