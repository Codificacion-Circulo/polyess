const express = require("express");
const router = express.Router();
const {
    login,
    register,
    postHessBought,
    postHessDestroyed,
    getAllUsers,
} = require("../controllers/userControll");
router.route("/users").get(getAllUsers);
router.route("/login").get(login);
router.route("/register").post(register);
router.route("/hessBought").post(postHessBought);
router.route("/hessDestroyed").post(postHessDestroyed);
module.exports = router;