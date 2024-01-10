import {Router} from 'express'
import { addProduct, getllProducts , yourProducts, updateProduct, deleteProduct, getSingleProducts} from '../Controllers/Products.Controller.js';
import { checkUserID } from '../Middleware/AllMiddleware.js';

const router = Router();

router.post("/add-product" , checkUserID , addProduct);
router.get("/get-all-product" ,  getllProducts);
router.post("/your-products" , yourProducts);
router.post("/update-product" , updateProduct);
router.get("/get-single-product" , getSingleProducts);
router.delete("/delete-product" , deleteProduct);



export default router;