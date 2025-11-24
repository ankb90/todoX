import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksController.js";

const router = express.Router();

// [GET] /api/tasks
router.get("/", getTasks);

// [POST] /api/tasks
router.post("/", createTask);

// [PUT] /api/tasks/:id
router.put("/:id", updateTask);

// [DELETE] /api/tasks/:id
router.delete("/:id", deleteTask);

export default router;
