import api from "../lib/axios.js";


const todoService = {
    getTodos(params) {
        return api.get("/api/todo/get", { params });
    },


    createTodo(data) {
        return api.post("/api/todo/add", data);
    },


    updateTodo(id, data) {
        return api.put(`/api/todo/edit/${id}`, data);
    },


    deleteTodo(id) {
        return api.delete(`/api/todo/delete/${id}`);
    },

    getTodoById(id) {
        return api.get(`/api/todo/get/${id}`);
    },
};

export default todoService;