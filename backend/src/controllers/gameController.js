const Nft = require('../models/Nft')
const Game=require('../models/Game')
const ErrorResponse = require("../utils/errorResponse");
const fetch = require('cross-fetch');
const User = require('../models/User');
const BASE_URI = process.env.BASE_URI




exports.postHessStaking = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
      await Game.create({
          initialPlayer:data.args[0],
          finalPlayer:data.args[1],
          amount:parseInt(data.args[2].hex),
          gameId:parseInt(data.args[3].hex),
      });
      res.status(200).json({ sucess: true});
    } catch (err) {
      next(err);
    }
  };



  exports.postNftStaking = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
      await Game.create({
          initialPlayer:data.args[0],
          finalPlayer:data.args[1],
          initialNftId:parseInt(data.args[2].hex),
          finalNftId:parseInt(data.args[3].hex),
          gameId:parseInt(data.args[4].hex),
      });
      res.status(200).json({ sucess: true});
    } catch (err) {
      next(err);
    }
};


exports.postHessWin = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
        const user0 = await User.findOne({
            address:data.args[0]
        })
        const user1 = await User.findOne({
          address:data.args[1]
      })
      if (!user1||!user0) {
            return next(new ErrorResponse("Users Not Found", 404));
        }
      await Game.findOneAndUpdate({
          gameId:parseInt(data.args[3].hex)
      },{
          winner:user0._id,
          loser:user1._id
      })
      await user0.addToken(parseInt(data.args[2].hex))
          await user1.subToken(parseInt(data.args[2].hex))
          await user0.save();
          await user1.save()
      res.status(200).json({ sucess: true});
    } catch (err) {
      next(err);
    }
  };




exports.postNftWin = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
        const user0 = await User.findOne({
            address:data.args[0]
        })
        const user1 = await User.findOne({
          address:data.args[1]
      })
      if (!user1||!user0) {
            return next(new ErrorResponse("Users Not Found", 404));
        }
      await Game.findOneAndUpdate({
          gameId:parseInt(data.args[4].hex)
      },{
          winner:user0._id,
          loser:user1._id
      })
      await Nft.findOneAndUpdate({ assetId:parseInt(data.args[0].hex) }, {owner:user0._id});
      res.status(200).json({ sucess: true});
    } catch (err) {
      next(err);
    }
  };
