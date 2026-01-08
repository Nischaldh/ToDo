import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js";
import { ENV } from "../lib/ENV.js"

export const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        if (!token && req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) return res.status(401).json({ success: false, message: "Unauthorized- No token provided" });
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized- No Invalid Token" });
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        })
        if (!user) return res.status(404).json({ success: false, message: "User Not Found" });
        req.user = user;
        next();


    } catch (error) {
        console.log("Error in protectRoute middleware: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}