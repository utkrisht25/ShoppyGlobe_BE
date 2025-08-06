import jwt from 'jsonwebtoken';

const key = process.env.KEY ;

const generateToken = (id)=>{
    return jwt.sign({ id: id },key , {
        expiresIn: "1d"
    } );
};

export default generateToken;