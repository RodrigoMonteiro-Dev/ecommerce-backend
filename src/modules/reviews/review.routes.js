

const express =  require("express");
const router = express.Router();
const reviewController = require("./review.controller");
const { routes } = require("../../app/app");
const authMiddleware = require("..//../midllewares/auth.middleware");


router.post("/", reviewController.create);
router.get("/product/:productId", reviewController.findByProduct);
router.put("/id", reviewController.update);
router.delete("/id", reviewController.delete);
router.post("/", authMiddleware, reviewController.create);

module.exports = routes;
