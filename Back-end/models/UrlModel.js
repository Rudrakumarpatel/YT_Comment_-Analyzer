const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: { type: String,required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const UrlModel = mongoose.model('urls', urlSchema);

module.exports = UrlModel;

