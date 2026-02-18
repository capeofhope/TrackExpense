const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
    try {
        const { displayName, email, password } = req.body;

        // Validation
        if (!displayName || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters.' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const defaultCategories = [
            { name: 'Food & Dining', type: 'Expense', icon: 'Utensils', color: 'bg-orange-500', isDefault: true },
            { name: 'Transport', type: 'Expense', icon: 'Car', color: 'bg-blue-500', isDefault: true },
            { name: 'Utilities', type: 'Expense', icon: 'Zap', color: 'bg-yellow-500', isDefault: true },
            { name: 'Shopping', type: 'Expense', icon: 'ShoppingBag', color: 'bg-pink-500', isDefault: true },
            { name: 'Entertainment', type: 'Expense', icon: 'Film', color: 'bg-purple-500', isDefault: true },
            { name: 'Salary', type: 'Income', icon: 'DollarSign', color: 'bg-green-500', isDefault: true },
            { name: 'Freelance', type: 'Income', icon: 'Briefcase', color: 'bg-teal-500', isDefault: true }
        ];

        user = new User({
            displayName,
            email,
            password: hashedPassword,
            categories: defaultCategories
        });

        await user.save();

        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ user, token });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.send({ user, token });
    } catch (e) {
        res.status(500).send();
    }
});

// Get Current User
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
