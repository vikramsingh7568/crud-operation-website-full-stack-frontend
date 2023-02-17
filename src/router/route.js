const express = require("express")
const router  = express.Router()
const userController  = require("../controller/UserController")
const ProductController = require('../controller/productController')
const middleware = require('../middleware/mid')


router.post("/register",userController.register)
router.post("/login",userController.login)

router.post('/addproducts',middleware.verifyToken,ProductController.addProduct)
router.get("/getproducts",middleware.verifyToken,ProductController.getProduct)
router.delete("/deleteproduct/:id",middleware.verifyToken,ProductController.deleteProduct)
router.get("/getproductsupdate/:id",ProductController.getProductsupdate)
router.put("/updateproduct/:id",middleware.verifyToken,ProductController.updateProduct)
router.get("/searchproduct/:key",middleware.verifyToken,ProductController.searchProduct)

router.all("/*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct !!!"
    })
})


module.exports = router