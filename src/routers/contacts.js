import { Router } from "express";
import { createContactController, deleteContactByIdController, fetchContactByIdController, fetchContactsController, patchContactByIdController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import { createContactSchema, patchContactSchema } from "../validation/contacts.js";
import isValidId from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(fetchContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(fetchContactByIdController));
router.post('/', validateBody(createContactSchema), upload.single("photo"), ctrlWrapper(createContactController));
router.patch('/:contactId', isValidId, upload.single("photo"), validateBody(patchContactSchema), ctrlWrapper(patchContactByIdController));
router.delete('/:contactId', isValidId,  ctrlWrapper(deleteContactByIdController));

export default router;