const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET


const authentificate = (req, res, next) => {
    console.log("Authentificate User before returning the response");
    jwt.verify(req.cookies.userToken, SECRET, (error, payload)=> {
        if(error){
            console.log("User Not allowed to be here");
            res.status(401).json({isVerified:false})
        } else {
            next()
        }
    })
}


module.exports = authentificate
