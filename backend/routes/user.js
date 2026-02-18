const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// GET /user (Get current user profile)
router.get('/', auth, async (req, res) => {
    try {
        // req.user is already fetched by auth middleware, but we return it directly
        res.json(req.user);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// PATCH /user/security (Update Password)
router.patch('/security', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!currentPassword || !newPassword) {
            return res.status(400).json('Please provide both current and new passwords');
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json('Invalid current password');
        }

        if (newPassword.length < 6) {
            return res.status(400).json('Password must be at least 6 characters');
        }

        user.password = await bcrypt.hash(newPassword, 8);
        await user.save();

        res.json('Password updated successfully');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// PUT /user (Update profile)
router.put('/', auth, async (req, res) => {
    try {
        const user = req.user; // Use authenticated user
        const updates = req.body;

        // Update fields safely
        if (updates.displayName !== undefined) user.displayName = updates.displayName;
        if (updates.email !== undefined) user.email = updates.email;
        if (updates.bio !== undefined) user.bio = updates.bio;
        if (updates.currency !== undefined) user.currency = updates.currency;
        if (updates.monthlyIncome !== undefined) user.monthlyIncome = updates.monthlyIncome;

        if (updates.notifications) {
            user.notifications = { ...user.notifications, ...updates.notifications };
        }
        if (updates.security && updates.security.twoFactorEnabled !== undefined) {
            user.security.twoFactorEnabled = updates.security.twoFactorEnabled;
        }

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// DELETE /user (Delete Account)
router.delete('/', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.json('Account deleted');
    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});

// Category Management Routes
router.post('/categories', auth, async (req, res) => {
    try {
        req.user.categories.push(req.body);
        await req.user.save();
        res.status(201).send(req.user.categories);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/categories/:id', auth, async (req, res) => {
    try {
        const category = req.user.categories.id(req.params.id);
        if (!category) return res.status(404).send();

        Object.assign(category, req.body);
        await req.user.save();
        res.send(req.user.categories);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/categories/:id', auth, async (req, res) => {
    try {
        req.user.categories.pull({ _id: req.params.id });
        await req.user.save();
        res.send(req.user.categories);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
