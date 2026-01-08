import api from "../lib/axios.js";


const authService = {
    signup(data) {
        return api.post("/api/auth/signup", data);
    },
    login(data) {
        return api.post("/api/auth/login", data);
    },

    logout() {
        return api.post("/api/auth/logout");
    },

    editProfile(data) {
        return api.put("/api/user/edit", data);
    },

    uploadProfile(file) {
        const formData = new FormData();
        formData.append("profilePic", file);

        return api.post("/api/user/uploadprofile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                withCredentials: true,
            },
        });
    },

    changePassword(data) {
        return api.put("/api/user/change-password", data);
    },
      getMe() {
    return api.get("/api/user/me");
  },
}
export default authService;