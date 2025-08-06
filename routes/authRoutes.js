import express from 'express';
import { register, login } from "../controllers/authControllers.js";
import protect from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// i'm using here one more route of getting my own details after login that can be used for profile 
router.get('/me', protect, (req,res)=>{
    res.json(req.user);
});
export default router;