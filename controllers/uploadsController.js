const cloudinary = require("cloudinary").v2;
const path = require("path");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
exports.uploadProductImageLocal = async (req, res, next) => {
  // check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;
  // check if it is an image
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload Image");
  }
  // check if its size allowed
  const maxSize = 1024 * 1024;
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

exports.uploadProductImage = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({
    image: {
      src: result.secure_url,
    },
  });
};
