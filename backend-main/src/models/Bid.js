const { model, Schema } = require('mongoose');

const bid = new Schema({
  assetId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Nft'
  },
  price: {
    type: Number,
    required: true,
  },
  bidder: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  owner_name:{
    type: String,
  },
  owner_addr:{
    type: String,
  }

});

const Bid = model('Bid', bid);

module.exports = Bid;
