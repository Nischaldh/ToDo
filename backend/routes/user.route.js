import { Router } from "express";
import { editProfile, uploadProfile, changePassword , getMe} from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { uploadProfilePic } from "../middleware/CloudinaryUpload.js";

const userRouter = Router();

userRouter.use(protectRoute);


userRouter.put("/edit",editProfile);
userRouter.post("/uploadprofile",uploadProfilePic.single("profilePic"),uploadProfile);
userRouter.put("/change-password", changePassword);
userRouter.get("/me", getMe)



export default userRouter;