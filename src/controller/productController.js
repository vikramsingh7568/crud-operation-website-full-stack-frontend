const productModel = require("../models/products");
const mongoose = require("mongoose");

const addProduct = async (req, res) => {
  try {
    console.log("Add prodct is runnig ");
    const product = await productModel.create(req.body);
    res.send(product);
  } catch (err) {
    res.status(500).send({ message: "server error occured" });
  }
};

const getProduct = async (req, res) => {
  try {
    console.log("getprodct is runnig ");
    let product = await productModel.find();
    if (product.length > 0) {
      res.send(product);
    } else {
      res.send({ status: false, message: "no product found" });
    }
  } catch (err) {
    res.status(500).send({ message: "server error occured" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    console.log("delete is runnig ");

    let id = req.params.id;
    let result = await productModel.deleteOne({ _id: id });
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "server error occured" });
  }
};

const getProductsupdate = async (req, res) => {
  try {
    console.log("getProductsupdate ");

    let id = req.params.id;
    let isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return res
        .status(400)
        .send({ status: false, message: "please enter valid bookId" });
    }
    let getdata = await productModel.findOne({ _id: id });
    if (getdata) {
      res.send(getdata);
    } else {
      res.send({ status: false, message: "no record found" });
    }
  } catch (err) {
    res.status(500).send({ message: "server error occured" });
  }
};
const updateProduct = async (req, res) => {
  try {
    console.log("updateProduct");
    console.log(req.body);
    let result = await productModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "server error occured" });
  }
};

const searchProduct = async (req, res) => {
  try {
    console.log("searchProduct");
    let result = await productModel.find({
      $or: [
        {
          name: { $regex: req.params.key },
        },
        {
          company: { $regex: req.params.key },
        },
      ],
    });
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "server error occured" });
  }
};

module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  getProductsupdate,
  updateProduct,
  searchProduct,
};
