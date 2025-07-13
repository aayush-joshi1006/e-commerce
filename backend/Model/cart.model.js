import mongoose from "mongoose";

// designing cart schema
const cartSchema = mongoose.Schema({
  //  id of the user to whom cart is assosiated
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  // items in the cart
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

// creating cartModel in the database
const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
