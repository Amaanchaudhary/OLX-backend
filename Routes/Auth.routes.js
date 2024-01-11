import {Router} from "express"
import { Login, Register, getCurrentUser , getAllInfo} from "../Controllers/Auth.Controller.js";

const router = Router();

router.post("/login" , Login)
router.post("/register",Register)
router.post("/get-current-user", getCurrentUser);
router.post("/get-all-info", getAllInfo)

export default router