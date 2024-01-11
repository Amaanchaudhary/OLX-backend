import { Router } from "express";
import { addCart , allCartProducts , deleteCartProduct } from "../Controllers/User.controller.js";

const router = Router();

router.post("/add-cart" , addCart)
router.post("/all-cart-products", allCartProducts)
router.post("/delete-cart-product", deleteCartProduct)


export default router;