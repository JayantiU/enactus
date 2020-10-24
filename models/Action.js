const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
    actions: [{
        type: String
    }],
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model('action', ActionSchema);