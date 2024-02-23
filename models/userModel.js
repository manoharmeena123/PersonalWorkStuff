const mongoose = require('mongoose');
const Joi = require('joi');
// const JoiValidation = require('mongoose-joi-validation');
// mongoose.plugin(JoiValidation);

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        joi: Joi.string().email().required(),
    },
    password: {
        type: String,
        required: true,
        joi: Joi.string().required(),
    },
    scope:{
        type: String,
        required: true,
        joi: Joi.string().required(),
    }
});

module.exports = mongoose.model('user', userSchema);
