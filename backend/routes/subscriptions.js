const router = require('express').Router();
const Subscription = require('../models/Subscription');
const auth = require('../middleware/auth');

// Get all subscriptions for user
router.get('/', auth, async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ user: req.user._id }).sort({ nextDueDate: 1 });
        res.send(subscriptions);
    } catch (e) {
        res.status(500).send();
    }
});

// Create new subscription
router.post('/', auth, async (req, res) => {
    const subscription = new Subscription({
        ...req.body,
        user: req.user._id
    });

    try {
        await subscription.save();
        res.status(201).send(subscription);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Update subscription
router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['serviceName', 'amount', 'currency', 'billingCycle', 'nextDueDate', 'category', 'status', 'icon'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const subscription = await Subscription.findOne({ _id: req.params.id, user: req.user._id });

        if (!subscription) {
            return res.status(404).send();
        }

        updates.forEach((update) => subscription[update] = req.body[update]);
        await subscription.save();
        res.send(subscription);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Delete subscription
router.delete('/:id', auth, async (req, res) => {
    try {
        const subscription = await Subscription.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!subscription) {
            return res.status(404).send();
        }

        res.send(subscription);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
