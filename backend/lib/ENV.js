import "dotenv/config"


export const ENV = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DUMMY_HASH: process.env.DUMMY_HASH,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_DEFAULT_AVATAR: process.env.CLOUDINARY_DEFAULT_AVATAR,

    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
};