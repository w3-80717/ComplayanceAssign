const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
