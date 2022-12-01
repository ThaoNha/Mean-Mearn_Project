const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', require: true },
  equipmentId: { type: Schema.Types.ObjectId, ref: 'equipment', require: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: null },
  lender: { type: Schema.Types.ObjectId, ref: 'users', require: true },
  adminReceiver: { type: Schema.Types.ObjectId, ref: 'users' },
});
module.exports = mongoose.model('history', HistorySchema);
