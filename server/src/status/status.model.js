const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  name: { status: String }
});

module.exports = mongoose.model('status', StatusSchema);
