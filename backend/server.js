const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const expensesRouter = require('./routes/expenses');
const userRouter = require('./routes/user');
const budgetsRouter = require('./routes/budgets');
const authRouter = require('./routes/auth');
const subscriptionsRouter = require('./routes/subscriptions');

// Routes
app.use('/api/auth', authRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/user', userRouter);
app.use('/api/budgets', budgetsRouter);
app.use('/api/subscriptions', subscriptionsRouter);

app.get('/', (req, res) => {
    res.send('Expense Tracker API is running');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
