const express = require('express');
const { createTransaction, getTransactions, approveTransaction, rejectTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect(['Employee']), createTransaction);

router.get('/', protect(['Employee', 'Manager']), getTransactions);

router.put('/:id/approve', protect(['Manager']), approveTransaction);

router.put('/:id/reject', protect(['Manager']), rejectTransaction);

module.exports = router;
