const User = require('../models/User');

async function isEmailVerified(req, res, next){
    try {

        const { username } = req.body;

        const user = await User.findOne( { username });
        if(!user){
            return res.status(403).json({ success: false, message: 'User not found '});
        }
        
        if( user && user.verified){
            return next();
        }else{
            return res.status(403).json({success: false, message: 'Email is not verified'});
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, error: 'Internal server error'});
    }
}


module.exports = { isEmailVerified };