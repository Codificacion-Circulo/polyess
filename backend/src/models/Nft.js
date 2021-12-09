const { model, Schema } = require('mongoose')

const nft = new Schema({
  owner: {
    type: String,
    unique:true,
  },
  assetId: {
    type: String,
  },
  price: {
    type: String,
    required:true,
  },
  image: {
    type: String,
  },
  attributes: {
    type: Array,
  },
  owner:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'User'
}

});

const Nft = model('Nft', nft)

module.exports = Nft
