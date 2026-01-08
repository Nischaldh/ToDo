import prisma from "../lib/prisma.js"

export const editProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        if (!name && !email) {
            return res.status(400).json({
                success: false,
                message: "Nothing to update",
            });
        }
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email format",
                });
            }
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser && existingUser.id !== userId) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use",
                });
            }
        }
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(name && { name }),
                ...(email && { email }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                profilePic: true,
            },
        });
        res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error in editProfile:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const uploadProfile = async (req, res) => {
    try {
        console.log("req.file:", req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });
        }
        const userId = req.user.id;
        const profilePicUrl = req.file.path;
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                profilePic: profilePicUrl,
            },
            select: {
                id: true,
                name: true,
                email: true,
                profilePic: true,
            },
        });
        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error("Upload profile error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });
        }
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 8 characters and include uppercase, lowercase, and special character",
            });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        const isSamePassword = await bcrypt.compare(
            newPassword,
            user.password
        );

        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: "New password must be different from old password",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

}

export const getMe = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};