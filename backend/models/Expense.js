const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    receipt: {
        type: String, // Path to the uploaded file
        required: false
    }
}, {
    timestamps: true, // adds created_at and updated_at
});

module.exports = mongoose.model('Expense', expenseSchema);
