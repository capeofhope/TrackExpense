const router = require('express').Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET /expenses
router.get('/', auth, async (req, res) => {
    try {
        const { category, sort } = req.query;
        let query = { user: req.user._id };

        if (category && category !== 'All Categories') {
            query.category = category;
        }

        let expensesQuery = Expense.find(query);

        if (sort === 'oldest') {
            expensesQuery = expensesQuery.sort({ date: 1 });
        } else if (sort === 'highest') {
            expensesQuery = expensesQuery.sort({ amount: -1 });
        } else if (sort === 'lowest') {
            expensesQuery = expensesQuery.sort({ amount: 1 });
        } else {
            expensesQuery = expensesQuery.sort({ date: -1 });
        }

        const expenses = await expensesQuery.exec();
        res.json(expenses);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// POST /expenses
router.post('/', auth, upload.single('receipt'), async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;
        const receipt = req.file ? req.file.path : null;

        const newExpense = new Expense({
            user: req.user._id,
            amount,
            category,
            description,
            date: date ? new Date(date) : undefined,
            receipt
        });

        await newExpense.save();
        res.json('Expense added!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// DELETE /expenses/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!expense) return res.status(404).json('Expense not found');
        res.json('Expense deleted.');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
