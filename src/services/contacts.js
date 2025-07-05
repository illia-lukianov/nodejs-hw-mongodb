import { contactModel } from "../models/schema.js";

export async function fetchContacts (req, res) {
    const data = await contactModel.find();
    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export async function fetchContactById (req, res) {
    const student = await contactModel.findById(req.params.contactId);

    if (student === null) {
    return res
      .status(404)
      .json({ status: 404, message: 'Student not found', data: null });
    }

    return res.json({
        status: 200,
	    message: `Successfully found contact with id ${req.params.contactId}!`,
        data: student,
    });
}