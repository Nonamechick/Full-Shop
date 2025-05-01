import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

// COMMENT PART 
// app.get("/products", (req, res) => {
//     res.send("Server is ready hell yeah");
// });

// console.log(process.env.MONGO_URI);