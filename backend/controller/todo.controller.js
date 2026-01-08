import prisma from "../lib/prisma.js";

export const addTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description, status, priority, dueDate } = req.body;

        if (!title) return res.status(400).json({ success: false, message: "Title is required" });
        const validStatuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"];
        const taskStatus = status ? status.toUpperCase() : "NOT_STARTED";
        if (!validStatuses.includes(taskStatus)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }
        const validPriorities = ["LOW", "MEDIUM", "HIGH"];
        const taskPriority = priority ? priority.toUpperCase() : "MEDIUM";
        if (!validPriorities.includes(taskPriority)) {
            return res.status(400).json({ success: false, message: "Invalid priority value" });
        }
        const todo = await prisma.todo.create({
            data: {
                title,
                description,
                status: taskStatus,
                priority: taskPriority,
                dueDate: dueDate ? new Date(dueDate) : null,
                userId
            }
        });
        res.status(201).json({ success: true, todo });

    } catch (error) {
        console.error("Error in addTask:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export const deleteTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const todo = await prisma.todo.findUnique({
            where: { id: Number(id) }
        });
        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }
        if (todo.userId !== userId) {
            return res.status(403).json({ success: false, message: "You are not allowed to delete this task" });
        }
        await prisma.todo.delete({
            where: { id: Number(id) }
        });
        res.status(200).json({ success: true, message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTask:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const editTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { title, description, status, priority, dueDate } = req.body;

        const todo = await prisma.todo.findUnique({
            where: { id: Number(id) }
        });

        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }

        if (todo.userId !== userId) {
            return res.status(403).json({ success: false, message: "You are not allowed to edit this task" });
        }

        const validStatuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"];
        let taskStatus = todo.status;
        if (status) {
            const upperStatus = status.toUpperCase();
            if (!validStatuses.includes(upperStatus)) {
                return res.status(400).json({ success: false, message: "Invalid status value" });
            }
            taskStatus = upperStatus;
        }
        const validPriorities = ["LOW", "MEDIUM", "HIGH"];
        let taskPriority = todo.priority;
        if (priority) {
            const upperPriority = priority.toUpperCase();
            if (!validPriorities.includes(upperPriority)) {
                return res.status(400).json({ success: false, message: "Invalid priority value" });
            }
            taskPriority = upperPriority;
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: Number(id) },
            data: {
                title: title ?? todo.title,
                description: description ?? todo.description,
                status: taskStatus,
                priority: taskPriority,
                dueDate: dueDate ? new Date(dueDate) : todo.dueDate,
            },
        });

        res.status(200).json({ success: true, todo: updatedTodo });

    } catch (error) {
        console.error("Error in editTask:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getTask = async (req, res) => {
    try {
        const userId = req.user.id;

        const { status, priority, page = 1, limit = 10, search } = req.query;

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        const whereClause = {
            userId,
        };
        if (status) {
            whereClause.status = status.toUpperCase();
        }
        if (priority) {
            whereClause.priority = priority.toUpperCase();
        }
        if (search) {
            whereClause.OR = [
                {
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ];
        }
        const totalTasks = await prisma.todo.count({
            where: whereClause,
        });
        const tasks = await prisma.todo.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            skip,
            take,
        });
        const allUserTodos = await prisma.todo.findMany({
            where: { userId },
            select: { status: true }
        });

        const stats = {
            left: allUserTodos.filter(t => t.status === 'NOT_STARTED').length,
            inProgress: allUserTodos.filter(t => t.status === 'IN_PROGRESS').length,
            completed: allUserTodos.filter(t => t.status === 'COMPLETED').length,
        };
        const isNext = totalTasks > skip + tasks.length;
        res.status(200).json({
            success: true,
            data: {
                tasks,
                isNext,
                stats
            },
        });

    } catch (error) {
        console.error("Error in getTasks:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const getTaskId = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const todo = await prisma.todo.findUnique({
            where: { id: Number(id) },
        });

        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }

        if (todo.userId !== userId) {
            return res.status(403).json({ success: false, message: "You are not allowed to view this task" });
        }

        res.status(200).json({ success: true, todo });

    } catch (error) {
        console.error("Error in getTaskId:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}