import {Router} from 'express'
import AuthRouters from './Auth.routes.js';
import ProductRouters from "./Products.routes.js";

const router = Router()


router.use("/auth", AuthRouters)
router.use("/product" , ProductRouters);


export default router;