const Joi = require("joi");

module.exports.schema = Joi.object({
    username:Joi.string().username().required(),
    password:Joi.string().password().require()
});