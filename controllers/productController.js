const constants = require("../constants/constant");
const Product = require("../models/productModel");
const userModel = require("../models/usermodel");


const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const createdBy = req.user.userId;
    // Validate input using Joi if needed
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      createdBy,
    });
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithUserData = await Promise.all(
      products.map(async (product) => {
        const user = await userModel.findById(product.createdBy);
        return {
          _id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          createdBy: user,
        };
      })
    );
    res.status(200).json(productsWithUserData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate("createdBy");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price, category } = req.body;
    // Find the product to update
    const product = await Product.findById(productId);
    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Check if the user is an admin
    if (req.user.scope === constants.SCOPE.ADMIN) {
      // Admins can update any product
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, description, price, category },
        { new: true }
      ).populate("createdBy");
      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    }
    // Check if the user is the creator of the product
    if (req.user.userId.toString() !== product.createdBy.toString()) {
      return res.status(403).json({ error: "Unauthorized", product });
    }
    // Customers can only update their own products
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, category },
      { new: true }
    ).populate("createdBy");
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Check if the user is an admin
    if (req.user.scope === constants.SCOPE.ADMIN) {
      // Admins can delete any product
      const deletedProduct = await Product.findByIdAndDelete(
        productId
      ).populate("createdBy");
      return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    }
    // Check if the user is the creator of the product
    if (req.user.userId.toString() !== product.createdBy.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    // User is authorized to delete their own product
    const deletedProduct = await Product.findByIdAndDelete(productId).populate(
      "createdBy"
    );
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
