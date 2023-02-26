const Joi = require('joi');

function validateUser(user) {
    const JoiSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(), 
        email: Joi.string().email().required(),
        dob: Joi.date().required(),
        mailList: Joi.string().required()
    })
    .options({ abortEarly: false });  
        
    return JoiSchema.validate(user);
}

function validateBook(book){
    const JoiSchema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        publicationDate: Joi.string().required(),
        publisher: Joi.string().required(),
        pages: Joi.string().required(),
        bestSellerList: Joi.string().required(),
        totalInSeries: Joi.number().integer().min(1).required()
    })
    .options({ abortEarly: false });

    return JoiSchema.validate(book);
}
        
module.exports = { validateUser, validateBook };