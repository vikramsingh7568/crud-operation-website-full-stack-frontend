const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const jwtkey = 'e-comm';

function verifyToken(req, res, next) {
    try{
    console.log(req.headers.authorization)
    let token = req.headers.authorization
    if(token){
       jwt.verify(token, jwtkey, (error,valid) => {
         if(error){
                return res.status(401).send({ message : "please provide valid token"})
         }else{
              next();
         }
       })
    }else{
       return res.status(403).send({ message : "please add token with header"})
    }
}catch(err){
    res.status.send({message:err.message})
}
}

module.exports = {
    verifyToken
}