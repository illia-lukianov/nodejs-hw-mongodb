import mongoose from "mongoose";
import { patchContactSchema } from "../models/patchSchema.js";
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
    new (mongoose.models.tempPatchModel || mongoose.model('tempPatchModel', patchContactSchema))(payload).validateSync();
    return contactModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true, });
}

export async function deleteContact(id) {
    return contactModel.findByIdAndDelete(id);
}