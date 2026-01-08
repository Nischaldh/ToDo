import bcrypt from "bcryptjs"
import prisma from "../lib/prisma.js";
import { generateToken } from "../lib/jwt.js";
import { ENV } from "../lib/env.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, profilePic } = req.body;
        if (!name || !email || !password) return res.status(400).json({ success: false, message: "Please provide all the credentials" })
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Please provide valid email address." })
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters \n Password must contains at least 1 uppercase letter, 1 lowercase letter and a speical character." })
        }
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                profilePic: profilePic || ENV.CLOUDINARY_DEFAULT_AVATAR
            },
        });
        const token = generateToken(user.id, res);
        const read_cookie = req.cookies.jwt;
        console.log("Read Cookie: ", read_cookie);
        res.status(201).json({ success: true, user: { id: user.id, name: user.name, email: user.email, profilePic: user.profilePic }, token });
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: "Please provide all the credentials" })
        const user = await prisma.user.findUnique({ where: { email } });
        const hashedPassword = user ? user.password : ENV.DUMMY_HASH;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!user || !isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = generateToken(user.id, res);
        const read_cookie = req.cookies.jwt;
        console.log("Read Cookie: ", read_cookie);
        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
            },
            token,
        });


    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};