const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        default: 'Alex Johnson'
    },
    email: {
        type: String,
        default: 'alex.johnson@example.com',
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'Freelance designer and finance enthusiast tracking expenses for better saving habits.'
    },
    currency: {
        type: String,
        default: 'INR'
    },
    notifications: {
        spendingAlerts: { type: Boolean, default: true },
        weeklyReports: { type: Boolean, default: false },
        billReminders: { type: Boolean, default: true }
    },
    monthlyIncome: {
        type: Number,
        default: 50000
    },
    categories: [{
        name: { type: String, required: true },
        type: { type: String, enum: ['Expense', 'Income'], required: true },
        icon: { type: String, default: 'Circle' },
        color: { type: String, default: 'bg-gray-500' },
        isDefault: { type: Boolean, default: false }
    }],
    security: {
        twoFactorEnabled: { type: Boolean, default: false }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
