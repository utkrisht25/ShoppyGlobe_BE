import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Validate required fields
    if (!productId || !quantity) {
      return res.status(400).json({ message: "ProductId and quantity are required" });
    }
    
    // Validate quantity is a positive number
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }
    
    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }
    
    // Add or update item in cart
    const index = cart.items.findIndex(item => item.productId.toString() === productId);
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    
    await cart.save();
    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put('/:productId', verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    // Validate quantity
    if (!quantity) {
      return res.status(400).json({ message: "Quantity is required" });
    }
    
    // Validate quantity is a positive number
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }
    
    // Check if cart exists
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    
    // Check if product exists in cart
    const item = cart.items.find(item => item.productId.toString() === req.params.productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      return res.json(cart);
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    // Check if cart exists
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    
    // Check if product exists in cart
    const itemExists = cart.items.some(item => item.productId.toString() === req.params.productId);
    if (!itemExists) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    
    // Remove item from cart
    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    await cart.save();
    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
