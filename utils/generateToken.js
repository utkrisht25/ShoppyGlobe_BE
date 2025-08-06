import jwt from 'jsonwebtoken';

const key = process.env.KEY ;

const generateToken = (userId)=>{
    return jwt.sign({_id: userId} ,process.env.KEY , {
        expiresIn: "1d"
    } );
};

export default generateToken;