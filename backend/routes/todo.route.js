import { Router } from "express";
import { addTask, deleteTask, editTask, getTask, getTaskId } from "../controller/todo.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const todoRouter = Router();

todoRouter.use(protectRoute);

todoRouter.post("/add", addTask);
todoRouter.get("/get", getTask);
todoRouter.put("/edit/:id", editTask);
todoRouter.delete("/delete/:id", deleteTask)
todoRouter.get("/get/:id", getTaskId)


export default todoRouter;