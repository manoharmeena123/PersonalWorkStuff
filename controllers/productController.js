const constants = require("../constants/constant");
const Product = require("../models/productModel");
const userModel = require("../models/usermodel");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const createdBy = req.user.userId;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      createdBy,
    });
    const savedProduct = await newProduct.save();
    res.status(200).json({
      message: "Product created successfully",
      status: 200,
      product: savedProduct,
    });
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
    res.status(200).json({ status: 200, data: productsWithUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", status: 500 });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate("createdBy");
    if (!product) {
      return res.status(404).json({ error: "Product not found", status: 404 });
    }
    res.status(200).json({ status: 200, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", status: 500 });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price, category } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found", status: 404 });
    }
    if (req.user.scope === constants.SCOPE.ADMIN) {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, description, price, category },
        { new: true }
      ).populate("createdBy");
      return res.status(200).json({
        message: "Product updated successfully",
        status: 200,
        product: updatedProduct,
      });
    }
    if (req.user.userId.toString() !== product.createdBy.toString()) {
      return res.status(403).json({ error: "Unauthorized", product });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, category },
      { new: true }
    ).populate("createdBy");
    res.status(200).json({
      message: "Product updated successfully",
      status: 200,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", status: 500 });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found", status: 404 });
    }
    if (req.user.scope === constants.SCOPE.ADMIN) {
      const deletedProduct = await Product.findByIdAndDelete(
        productId
      ).populate("createdBy");
      return res.status(200).json({
        message: "Product deleted successfully",
        status: 200,
        product: deletedProduct,
      });
    }
    if (req.user.userId.toString() !== product.createdBy.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const deletedProduct = await Product.findByIdAndDelete(productId).populate(
      "createdBy"
    );
    res.status(200).json({
      message: "Product deleted successfully",
      status: 200,
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", status: 500 });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
