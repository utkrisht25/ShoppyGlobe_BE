import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const data = await User.findOne({ email });
        if (data) {
            return res.status(400).json({ message: "user already exists" });
        } else {
            await User.create({
                username,
                email,
                password: bcrypt.hashSync(password, 10)
            })
            return res.status(201).json({ "Message": "user created successfully" })
        }

    } catch (err) {
        return res.status(500).json({ message: "server error", error: err.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let data = await User.findOne({ email })
        if (!data) {
           return  res.status(404).json({ "Message": "user dosen't exists" });
        }
        let validPassword = bcrypt.compareSync(password, data.password);
        if (!validPassword) {
            return res.status(403).json({ message: "wrong credentials" })
        }
        return res.status(200).json({
            user:{
                username: data.username,
                email: data.email,
            },
            accessToken: generateToken(data._id),
            "Message": "Logged in successfully"
        })
    } catch (err) {
       return  res.status(500).json({ message: "Server Error", error: err.message });
    }
};
