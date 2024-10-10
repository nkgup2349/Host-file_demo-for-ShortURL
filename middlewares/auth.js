const { getUser } = require("../service/auth");

function cheakForAuthentication(req , res , next){
  const token_cookie = req.cookies?.token_cookie__ka_naam;
  req.user = null ; 
  if(!token_cookie) return next();

  const token = token_cookie;
  const user = getUser(token) ; 
  req.user = user ; 
  return next();
}

// ADMIN / ONLY_NORMAL_USER
function restricto(roles=[]){
  return function(req , res , next){
    if(!req.user) return res.redirect("/login");
    if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
   return next();
  };
}


module.exports = {
  cheakForAuthentication,
  restricto,
};

