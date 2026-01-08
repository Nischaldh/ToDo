import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "todo-app/profile-pics",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [
            { width: 300, height: 300, crop: "fill" }, // square avatar
        ],
    },
});

export const uploadProfilePic = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});
