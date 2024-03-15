const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  comment:{type: String, required: true},
  sentiment:{type: Number, required: true},
});
const Comments = mongoose.model('comments',commentSchema);

module.exports = Comments;