const { model, Schema } = require('mongoose');

const nft = new Schema({
  assetId: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  attributes: {
    rank:String,
    country:String,
    trait:String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  owner_name:{
    type: String,
  }

});

const Nft = model('Nft', nft);

module.exports = Nft;
