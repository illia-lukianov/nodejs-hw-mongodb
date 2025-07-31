import { Router } from "express";
import ContactsRouter from './contacts.js';
import AuthRouter from './auth.js';

const router = Router();
router.use('/auth', AuthRouter)
router.use('/contacts', ContactsRouter);
export default router;