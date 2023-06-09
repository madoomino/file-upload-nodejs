const router = require("express").Router();
const productController = require("../controllers/productController");
const uploadsController = require("../controllers/uploadsController");

router
  .route("/")
  .post(uploadsController.uploadProductImage, productController.createProduct)
  .get(productController.getAllProducts);

module.exports = router;
