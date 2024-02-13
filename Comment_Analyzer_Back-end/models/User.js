const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {type:String,unique: true,required:true},
  password: {type:String,required:true},
});

const User = mongoose.model('User_details',userSchema);

module.exports = User;
