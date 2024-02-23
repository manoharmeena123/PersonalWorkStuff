const express = require('express');
const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const productRoutes = express.Router();
const cookieParser = require('cookie-parser');
productRoutes.use(cookieParser());

productRoutes.post("/add", addProduct);
productRoutes.get("/all", getAllProducts);
productRoutes.get("/:productId", getProductById);
productRoutes.put("/:productId", updateProduct);
productRoutes.delete("/:productId", deleteProduct);

module.exports = {
    productRoutes,
};
