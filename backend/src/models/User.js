const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    unique:true,
    required: [true, "Please provide id"],
    trim:true
  },
  username: {
    type: String,
    unique:true,
    required: [true, "Please provide username"],
    trim:true
  },
  rank: {
    type: Number,
    default:0
  },
  token: {
    type: Number,
    default:0
  }
});

UserSchema.virtual('nfts',{
  ref:'Nft',
  localField:'_id',
  foreignField:'owner'
})

UserSchema.methods.addToken = function (tkn) {
  this.token+=tkn;
};

UserSchema.methods.subToken = async function (tkn) {
  this.token-=tkn;
};


const User = mongoose.model("User", UserSchema);

module.exports = User;