const express = require("express");
const router = express.Router();
const { postHessWin, postHessStaking, postNftStaking, postNftWin } = require("../controllers/gameController");
router.route("/hessWon").post(postHessWin)
router.route("/hessStaked").post(postHessStaking)
router.route("/nftStaked").post(postNftStaking);
router.route("/nftWon").post(postNftWin);

module.exports = router;