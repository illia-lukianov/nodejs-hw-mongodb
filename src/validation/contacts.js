import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } ).required(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  photo: Joi.string() .optional(),
  parentId: Joi.string().custom((value, helper) => {
		    if (value && !isValidObjectId(value)) {
		      return helper.message('Parent id should be a valid mongo id');
		    }
		    return true;
		 }),
});

export const patchContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email({ minDomainSegments: 2, tlds: {allow: ["com", "net"]}}),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  photo: Joi.string().optional(),
});