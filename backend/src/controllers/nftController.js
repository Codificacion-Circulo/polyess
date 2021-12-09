const Nft = require('../models/Nft')
const ErrorResponse = require("../utils/errorResponse");
const fetch = require('cross-fetch');
const User = require('../models/User');
const BASE_URI = process.env.BASE_URI




exports.postNftMinted = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
      const user=await User.findOne({
        address:data.args[0]
      })
      if (!user) {
        return next(new ErrorResponse("Profile not found", 404));
    }

      const nft = await Nft.create({
        owner:user._id,
        assetId:parseInt(data.args[1].hex),
        price:parseInt(data.args[2].hex),
      });
      res.status(200).json({ sucess: true});
    } catch (err) {
      next(err);
    }
  };


