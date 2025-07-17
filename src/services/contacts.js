import { contactModel } from "../models/schema.js";

export async function allContacts () {
    return contactModel.find()
};

export async function contactById (id) {
    return contactModel.findById(id);
}

export async function createContact(payload) {
    return contactModel.create(payload);
}

export async function patchContact(id, payload) {
    return contactModel.findByIdAndUpdate(id, payload, { new: true, });
}

export async function deleteContact(id) {
    return contactModel.findByIdAndDelete(id);
}