const express = require("express");
const URL = require("../models/url");
const {restricto} = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/allurls" , restricto(["ADMIN"]) ,  async (req, res) => {
  const  nema = `Admin ${req.user.Name}`; 
  const allurls = await URL.find({ });
  return res.render("home", {
    urls: allurls,
    Name : nema,
  });
})

router.get("/",restricto(["ONLY_NORMAL_USER" , "ADMIN"]), async (req, res) => {
  const  nema = ` ${req.user.Name}`;
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
    Name : nema,
  });
});


router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/logout", (req, res) => {
  console.log("Loged Out");
  res.clearCookie('token_cookie__ka_naam'); 
  res.render("login");
});


module.exports = router;
