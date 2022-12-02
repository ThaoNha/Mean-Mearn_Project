const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  id: { type: String, require: true, unique: true },
  name: { type: String, require: true},
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'type'},
  description: { type: String ,default: null},
  status: {
    type: String,
    enum: ['available', 'borrowed', 'repairing', 'deleted'],
    default: 'available',
  },
});
module.exports = mongoose.model('equipment', EquipmentSchema);
