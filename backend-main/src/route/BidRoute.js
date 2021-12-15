const express = require("express");
const router = express.Router();
const { getAllBids, postBidCreated, postBidEnd } = require("../controllers/bidController")
router.route("/bids").get(getAllBids);
router.route("/bidCreated").post(postBidCreated);
router.route("/bidEnd").post(postBidEnd);

module.exports = router;