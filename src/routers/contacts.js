import { Router } from "express";
import { createContactController, deleteContactByIdController, fetchContactByIdController, fetchContactsController, patchContactByIdController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import { createContactSchema, patchContactSchema } from "../validation/contacts.js";
import isValidId from "../middlewares/isValidId.js";

const router = Router();

router.get('/', ctrlWrapper(fetchContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(fetchContactByIdController));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/:contactId', isValidId, validateBody(patchContactSchema), ctrlWrapper(patchContactByIdController));
router.delete('/:contactId', isValidId,  ctrlWrapper(deleteContactByIdController));

export default router;