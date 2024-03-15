const fetchuser = (req, res, next) => {
const jwt = require('jsonwebtoken');
  const JWT_SECRET = "jwt-secret";

  const token = req.header('authtoken');
  if(!token){
    res.status(401).send({error:"Please authentication using a valid token"});
  }
  try 
  {
  const data = jwt.verify(token,JWT_SECRET)
  req.user = data.user;
  next();
  } catch (error) 
  {
    res.status(401).send({error:"Please authentication using a valid token"});    
  }

}
module.exports = fetchuser;