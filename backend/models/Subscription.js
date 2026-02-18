const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceName: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    billingCycle: {
        type: String,
        enum: ['Monthly', 'Yearly'],
        default: 'Monthly'
    },
    nextDueDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        default: 'Other'
    },
    status: {
        type: String,
        enum: ['Active', 'Cancelled', 'Expired'],
        default: 'Active'
    },
    icon: {
        type: String, // URL or identifier for icon
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
