const mongoose = require('mongoose');
const Joi = require('joi');

// Define Mongoose schema for user profile
const userProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

// const userProfileJoiSchema = Joi.object({
//     // user: Joi.string().required(), 
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     image: Joi.string().required(),
// });
// userProfileSchema.pre('validate', async function(next) {
//     try {
//         await userProfileJoiSchema.validateAsync(this.toObject());
//         next();
//     } catch (error) {
//         next(error);
//     }
// });
const userProfileModel = mongoose.model('UserProfile', userProfileSchema);
module.exports = userProfileModel;
