const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: { type: String, unique: true, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const UrlModel = mongoose.model('Url', urlSchema);

module.exports = UrlModel;

