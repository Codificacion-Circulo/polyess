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



// exports.getOneOrder = async (req, res, next) => {
//     const _id = req.params.id
//     if (!_id) {
//         return next(new ErrorResponse("Invalid Params", 400));
//     }
//     try {
//         const order = await Order.findOne({ assetId: _id })
//         if (!order) {
//             return next(new ErrorResponse("Order Not Found", 404));
//         }
//         res.send(order)
//     } catch (e) {
//         next(e)
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



  exports.login = async (req, res, next) => {
    const { address, username } = req.body;
    if (!address) {
      return next(new ErrorResponse("Please provide an email and password", 400));
    }
    try {
      const user = await User.findOne({ address })
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      await user.populate({
        path:'nfts',
    }).execPopulate()
      res.status(200).json({ success: true,user});
    } catch (err) {
      next(err);
    }
  };
  
  
  


exports.postHessBought = async (req, res, next) => {
    const data  = req.body;
    console.log(data.args[1])
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


