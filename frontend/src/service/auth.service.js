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
        return api.put("/api/user/edit", data,{
            headers: {
                withCredentials: true,
            },
        });
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
        return api.put("/api/user/change-password", data,{
            headers: {
                withCredentials: true,
            },
        });
    },
      getMe() {
    return api.get("/api/user/me",{
        headers: {
            withCredentials: true,
        },
    });
  },
}
export default authService;