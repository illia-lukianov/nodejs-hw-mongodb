import createHttpError from "http-errors";
import { allContacts, contactById, createContact, deleteContact, patchContact } from "../services/contacts.js";

export async function fetchContactsController(req, res) {
    const data = await allContacts();
    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export async function fetchContactByIdController(req, res) {
  const contact = await contactById(req.params.contactId);
  console.log(contact)
  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  return res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${req.params.contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = await createContact(req.body);

  return res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
}

export async function patchContactByIdController(req, res) {
  const contact =  await patchContact(req.params.contactId, req.body);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  return res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: contact,
  });
}

export async function deleteContactByIdController(req, res) {
  const contact = await deleteContact(req.params.contactId);

  if (contact === null) {
    throw createHttpError(404, "Contact not found");
  }

  return res.status(204).end();
}