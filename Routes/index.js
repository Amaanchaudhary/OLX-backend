import {Router} from 'express'
import AuthRouters from './Auth.routes.js';
import ProductRouters from "./Products.routes.js";
import UserRouters from './User.routes.js'

const router = Router()


router.use("/auth", AuthRouters)
router.use("/product" , ProductRouters);
router.use("/user" , UserRouters)


export default router;