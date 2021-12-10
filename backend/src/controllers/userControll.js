const Nft = require('../models/Nft')
const ErrorResponse = require("../utils/errorResponse");
const fetch = require('cross-fetch');
const User = require('../models/User');
const BASE_URI = process.env.BASE_URI




// exports.getAllOrder = async (req, res, next) => {
//     var srt = 0
//     var lim = 0
//     const array = []
//     let params = new URLSearchParams(req.query);
//     if (req.query.sort) {
//         srt = req.query.sort
//         params.delete('sort')
//     }
//     if (req.query.limit) {
//         lim = req.query.limit
//         params.delete('limit')
//     }
//     for (const [key, value] of (params)) {
//         var match = {}
//         match.trait_type = key,
//             match.value = value
//         array.push({ attributes: { $elemMatch: match } })
//     }
//     try {
//         var orders = {};
//         if (array.length > 0) {
//             orders = await Order.find(
//                 { $and: array }
//             )
//                 .sort(srt || 'price')
//                 .limit(Number(lim))
//         } else {
//             orders = await Order.find(
//                 {}
//             )
//                 .sort(srt)
//                 .limit(Number(lim))
//         }
//         if (!orders) {
//             return next(new ErrorResponse("Orders Not Found", 404));
//         }
//         res.send(orders)
//     } catch (e) {
//         next(e);
//     }
// }



exports.register = async (req, res, next) => {
    const {address, username } = req.body;
    try {
      const user = await User.create({
        address,
        username
      });
      res.status(200).json({ sucess: true, user});
    } catch (err) {
      next(err);
    }
  };


  exports.getAll = async (req, res, next) => {
    const sort={}
    if(req.query.sortBy){
      const parts =req.query.sortBy.split(':')
      sort[parts[0]]= part[1]==='desc'?-1:1
  }
    try {
      const user = await User.find({})
      .populate({
        path:'nfts',
        options:{
            limit:parseInt(req.query.limit),
            sort
        }
    })
    .populate({
      path:'win',
      options:{
          limit:parseInt(req.query.limit),
          sort
      }
  })
  .populate({
    path:'loose',
    options:{
        limit:parseInt(req.query.limit),
        sort
    }
})
    .exec();
      const nfts=user.nfts
      const win=user.win
      const loose=user.loose
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      };
      res.status(200).json({ success: true,user,nfts,win,loose});
    } catch (err) {
      next(err);
    }
  };
  



  exports.login = async (req, res, next) => {
    const sort={}
    const { address, username } = req.body;
    if (!address) {
      return next(new ErrorResponse("Please provide an email and password", 400));
    }
    if(req.query.sortBy){
      const parts =req.query.sortBy.split(':')
      sort[parts[0]]= part[1]==='desc'?-1:1
  }
    try {
      const user = await User.findOne({ address })
      .populate({
        path:'nfts',
        options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
        }
    })
    .populate({
      path:'win',
      options:{
          limit:parseInt(req.query.limit),
          skip:parseInt(req.query.skip),
          sort
      }
  })
  .populate({
    path:'loose',
    options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
    }
})
    .exec();
      const nfts=user.nfts
      const win=user.win
      const loose=user.loose
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      };
      res.status(200).json({ success: true,user,nfts,win,loose});
    } catch (err) {
      next(err);
    }
  };
  
  
  


exports.postHessBought = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
    const user = await User.findOne({
        address:data.args[1]
    })
    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }

        await user.addToken(parseInt(data.args[0].hex))
        await user.save();
        res.status(200).json({ success: true, data: "Token Added" });
    } catch (e) {
        next(e);
    }
};



exports.postHessMint = async (req, res, next) => {
  const data  = req.body;
  if (!data) {
      return next(new ErrorResponse("Invalid Parameters", 400));
  }
  try {
  const user = await User.findOne({
      address:data.args[1]
  })
  if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

      await user.addToken(parseInt(data.args[0].hex))
      await user.save();
      res.status(200).json({ success: true, data: "Token Added" });
  } catch (e) {
      next(e);
  }
};




exports.postHessDestroyed = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
    const user =await  User.findOne({
        address:data.args[1]
    })
    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
   
        await user.subToken(parseInt(data.args[0].hex))
        await user.save();
        res.status(200).json({ success: true, data: "Token Destroyed" });
    } catch (e) {
        next(e);
    }
};


