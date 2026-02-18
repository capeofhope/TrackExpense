const router = require('express').Router();
const Budget = require('../models/Budget');
const auth = require('../middleware/auth');

// GET /budgets
router.get('/', auth, async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user._id });
        res.json(budgets);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// POST /budgets
router.post('/', auth, async (req, res) => {
    try {
        const { category, limit, color } = req.body;
        const newBudget = new Budget({
            user: req.user._id,
            category,
            limit,
            color
        });
        await newBudget.save();
        res.json('Budget added!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// PUT /budgets/:id
router.put('/:id', auth, async (req, res) => {
    try {
        await Budget.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body
        );
        res.json('Budget updated!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// DELETE /budgets/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        await Budget.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        res.json('Budget deleted!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
