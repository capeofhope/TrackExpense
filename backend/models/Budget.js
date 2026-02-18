const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        unique: true
    },
    limit: {
        type: Number,
        required: true
    },
    spent: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        default: 'bg-green-500'
    }
}, {
    timestamps: true,
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
