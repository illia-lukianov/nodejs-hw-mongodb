import { contactModel } from "../models/schema.js";
import calculatePaginationData from "../utils/calculatePaginationData.js";

export async function allContacts ({page, perPage, sortBy, sortOrder, filter}) {
    const skip = (page - 1) * perPage;
    const contactsQuery = contactModel.find();
    if (filter.isFavourite === true || false) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    const contactsCount = await contactModel.find().merge(contactsQuery).countDocuments();
    const contacts = await contactsQuery.skip(skip).limit(perPage).sort({[sortBy]:sortOrder}).exec();
    const paginationData = calculatePaginationData(contactsCount, page, perPage );
    return {
      data: contacts,
      ...paginationData,
      sortBy,
      sortOrder,
      filter,
    };
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