const historySchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',                           
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',                           
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {  // ADD THIS FIELD
        type: String,
        enum: ['ZAR', 'USD', 'GBP', 'JPY'],
        default: 'ZAR'
    },
    originalAmount: {  // ADD THIS FIELD
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: 'Payment transfer'
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Completed'
    }
}, {
    timestamps: true
});