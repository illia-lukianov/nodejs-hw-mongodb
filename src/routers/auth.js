import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import { loginSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
import { loginController, logoutController, refreshController, registerController, resetPwdController, sendResetEmailController } from "../controllers/auth.js";

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerController));
router.post('/login', validateBody(loginSchema), ctrlWrapper(loginController));
router.post('/refresh', ctrlWrapper(refreshController));
router.post('/logout', ctrlWrapper(logoutController));
router.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(sendResetEmailController));
router.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPwdController))

export default router;