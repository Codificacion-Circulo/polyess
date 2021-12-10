const express = require("express");
const router = express.Router();

const {
   postNftMinted, postNftExchange
} = require("../controllers/nftController");

router.route("/nftMinted").post(postNftMinted);
router.route('/nftTransfer').post(postNftExchange)

module.exports = router;