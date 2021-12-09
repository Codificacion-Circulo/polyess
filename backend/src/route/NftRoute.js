const express = require("express");
const router = express.Router();

const {
   postNftMinted
} = require("../controllers/nftController");

router.route("/nftMinted").post(postNftMinted);

module.exports = router;