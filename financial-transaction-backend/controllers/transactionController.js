const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    const { type, amount, description } = req.body;
    try {
        const transaction = new Transaction({
            type,
            amount,
            description,
            user: req.user.id,
        });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const query = req.user.role === 'Manager' ? {} : { user: req.user.id };
        const transactions = await Transaction.find(query);
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.approveTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction.status !== 'Pending') return res.status(400).json({ message: 'Transaction not pending' });

        transaction.status = 'Approved';
        await transaction.save();
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.rejectTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction.status !== 'Pending') return res.status(400).json({ message: 'Transaction not pending' });

        transaction.status = 'Rejected';
        await transaction.save();
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
