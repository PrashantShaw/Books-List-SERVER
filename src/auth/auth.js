const jwt = require('jsonwebtoken')
const secret_key = 'this is a secret key'

const authenticateUser = (req, res, next)=>{
    const token = req.headers.authorization
    if(!token) return res.status(403).json({message: 'user not authorized'})

    jwt.verify(token, secret_key, (err, decoded)=>{
        if(err) res.status(403).json({message: err.message})

        req.user = decoded.data
        next()
    })
}

module.exports=authenticateUser