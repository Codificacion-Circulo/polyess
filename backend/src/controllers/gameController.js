const Nft = require('../models/Nft')
const Game=require('../models/Game')
const ErrorResponse = require("../utils/errorResponse");
// const fetch = require('cross-fetch');
const User = require('../models/User');
// const BASE_URI = process.env.BASE_URI


exports.getAllGames = async (req, res, next) => {
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
      const games = await Game.find(match)
          .sort(srt || 'amount')
          .limit(Number(lim));
      if (!games) {
          return next(new ErrorResponse("Games Not Found", 404));
      }
      res.send(games);
  } catch (e) {
      next(e);
  }
};





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
        if(data.args[0]===data.args[1]){
          await user0.draw();
          await user1.draw();
          await user0.save();
          await user1.save();
          res.status(200).json({ sucess: true});
        }else{
          const game=await Game.findOneAndUpdate({
            gameId:parseInt(data.args[3].hex)
        },{
            winner:user0._id,
            loser:user1._id
        })
        if (!game) {
          return next(new ErrorResponse("Game Not Found", 404));
        }
        await user0.addToken(parseInt(data.args[2].hex))
        await user1.subToken(parseInt(data.args[2].hex))
        await user0.won();
        await user1.lost();
        await user0.save();
        await user1.save();
        res.status(200).json({ sucess: true});
        }
     
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
      if(data.args[0]===data.args[1]){
        await user0.draw();
        await user1.draw();
        await user0.save();
        await user1.save();
        res.status(200).json({ sucess: true});
      }else{
        const game=await Game.findOneAndUpdate({
        gameId:parseInt(data.args[4].hex)
    },{
        winner:user0._id,
        loser:user1._id
    })
    if (!game) {
      return next(new ErrorResponse("Game Not Found", 404));
  }
    await Nft.findOneAndUpdate({ assetId:parseInt(data.args[0].hex) }, {owner:user0._id});
    await user0.won();
    await user1.lost();
    await user0.save();
    await user1.save();
    res.status(200).json({ sucess: true});
      }
       
    } catch (err) {
      next(err);
    }
  };
