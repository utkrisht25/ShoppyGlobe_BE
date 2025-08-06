import express from 'express';
import Cart from '../models/Cart.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id }) || new Cart({ userId: req.user.id, items: [] });
  const index = cart.items.findIndex(item => item.productId.toString() === productId);
  if (index > -1) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  await cart.save();
  res.json(cart);
});

router.put('/:productId', verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  const item = cart.items.find(item => item.productId.toString() === req.params.productId);
  if (item) {
    item.quantity = req.body.quantity;
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: "Item not found in cart" });
  }
});

router.delete('/:productId', verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
  await cart.save();
  res.json(cart);
});

export default router;
