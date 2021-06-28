const Joi = require('joi');
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 5,
        maxlength: 100
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('Customer', customerSchema);


function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        phone: Joi.string().min(5).max(15).required()
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;