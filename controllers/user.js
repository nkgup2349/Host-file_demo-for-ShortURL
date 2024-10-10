const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { set } = require("mongoose");


async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  try {
    await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
  
  } catch (error) {
    console.log(`error:${error}`);
    return res.render("signup" , {
      errorkahua:"Already Resistered with this Email",
    });
  }
  
  
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  console.log(`name:${user.name}`);
  const { setUser } = require("../service/auth");
  const jwt_token = setUser(user);
  res.cookie("token_cookie__ka_naam", jwt_token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};

