const Nft = require('../models/Nft');
const ErrorResponse = require("../utils/errorResponse");
const fetch = require('cross-fetch');
const User = require('../models/User');
const BASE_URI = process.env.BASE_URI;


exports.getAllNfts = async (req, res, next) => {
  var srt = 0;
  var lim = 0;
  const match = {};
  let params = new URLSearchParams(req.query);
  if (req.query.sort) {
      srt = req.query.sort;
      params.delete('sort');
  }
  if (req.query.limit) {
      lim = req.query.limit;
      params.delete('limit');
  }
  for (const [key, value] of (params)) {
      match[key] = value;
  }
  try {
      const nfts = await Nft.find(match)
          .sort(srt || 'price')
          .limit(Number(lim));
      if (!nfts) {
          return next(new ErrorResponse("Nfts Not Found", 404));
      }
      res.send(nfts);
  } catch (e) {
      next(e);
  }
};



exports.postNftMinted = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
      const user=await User.findOne({
        address:data.args[0]
      });
      if (!user) {
        return next(new ErrorResponse("Profile not found", 404));
    }

      await Nft.create({
        owner:user._id,
        assetId:parseInt(data.args[1].hex),
        price:parseInt(data.args[2].hex),
      });
      const tkkn=parseInt(data.args[2].hex);
      await user.subToken(tkkn);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  };



  exports.postNftExchange = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
      const user0 = await User.findOne({
          address:data.args[1]
      });
      const user1 = await User.findOne({
        address:data.args[2]
    });
    if (!user1||!user0) {
          return next(new ErrorResponse("Users Not Found", 404));
      }
      const nft=await Nft.findOneAndUpdate({ assetId:parseInt(data.args[0].hex) }, {price:parseInt(data.args[3].hex),
        owner:user0._id});
      if(!nft){
        return next(new ErrorResponse("Nft Not Found", 404));
      }
          await user1.addToken(parseInt(data.args[3].hex));
          await user0.subToken(parseInt(data.args[3].hex));
          await user1.save();
          await user0.save();

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  };
