import { Router } from "express";
import {showCartItems,addItemToCart,removeItemFromCart} from "../controllers/carts.js"

const router=Router();

//Receive a get request to show all items in cart
router.get("/cart",showCartItems);
//Receive a Post request to add an item in cart
router.post("/cart/products",addItemToCart);
//Receive a post request to delete an item from a cart

router.post("/cart/products/:productId/delete",removeItemFromCart)


export default router;