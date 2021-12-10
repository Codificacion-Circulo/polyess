const { model, Schema } = require('mongoose')

const nft = new Schema({
  assetId: {
    type: String,
  },
  price: {
    type: Number,
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
    unique:true,
    ref:'User'
}

});

const Nft = model('Nft', nft)

module.exports = Nft
