import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: String,
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
    }]
});
export default mongoose.model('Cart', cartSchema);