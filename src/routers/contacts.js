import { Router } from "express";
import { createContactController, deleteContactByIdController, fetchContactByIdController, fetchContactsController, patchContactByIdController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/', ctrlWrapper(fetchContactsController));
router.get('/:contactId', ctrlWrapper(fetchContactByIdController));
router.post('/', ctrlWrapper(createContactController));
router.patch('/:contactId',  ctrlWrapper(patchContactByIdController));
router.delete('/:contactId',  ctrlWrapper(deleteContactByIdController));

export default router;