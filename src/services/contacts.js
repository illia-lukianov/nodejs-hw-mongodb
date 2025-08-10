import { contactModel } from "../models/contact.js";
import calculatePaginationData from "../utils/calculatePaginationData.js";

export async function allContacts ({page, perPage, sortBy, sortOrder, filter, userId}) {
    const skip = (page - 1) * perPage;
    const contactsQuery = contactModel.find({ userId });
    if (filter.contactType !== undefined) {
        contactsQuery.where('contactType').equals(filter.contactType);
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

export async function contactById (id, userId) {
    return contactModel.findOne({ _id: id, userId });
}

export async function createContact(payload, photo, userId) {
    const user = {userId , ...payload, photo};
    return contactModel.create(user);
}

export async function patchContact(id, payload, userId, photo) {
    if (photo) {
      payload.photo = photo;
    }
    return contactModel.findOneAndUpdate({ _id: id, userId }, payload, { new: true, });
}

export async function deleteContact(id, userId ) {
    return contactModel.findOneAndDelete({ _id: id, userId });
}