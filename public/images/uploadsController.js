const { StatusCode } = require("http-status-codes");
const path = require("path");
const CustomError = require("../errors");
exports.uploadProductImage = async (req, res, next) => {
  // check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;
  // check if it is an image
  if (productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload Image");
  }
  // check if its size allowed
  const maxSize = 1000;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Image size is too big");
  }

  const imagePath = path.join(
    __dirname,
    "../public/images/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  req.imagePath = `/images/${productImage.name}`;
  next();
};
