const express = require("express");
const router = express.Router();

const {
   postNftMinted, postNftExchange, getAllNfts
} = require("../controllers/nftController");
router.route('/nfts').get(getAllNfts);
router.route("/nftMinted").post(postNftMinted);
router.route('/nftTransfer').post(postNftExchange)

module.exports = router;