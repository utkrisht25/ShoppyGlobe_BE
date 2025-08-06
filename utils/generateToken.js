import jwt from 'jsonwebtoken';

const key = process.env.KEY ;

const generateToken = (id)=>{
    return jwt.sign({ _id: id },key , {
        expiresIn: "1d"
    } );
};

export default generateToken;