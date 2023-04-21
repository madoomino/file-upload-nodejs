const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

exports.createProduct = async (req, res) => {
  const prod = await Product.create({
    name: req.body.name,
    price: req.body.price,
    image: req.imagePath,
  });
  res.status(StatusCodes.CREATED).json({
    prod,
  });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  return res.status(StatusCodes.ACCEPTED).json({
    products,
  });
};
