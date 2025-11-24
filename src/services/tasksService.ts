import { db } from "../config/db";
import { tasks } from "../schema/tasks";
import { eq, and } from "drizzle-orm"; 


export const getTasksByUserId = async (userId: number) => {
  return await db.select().from(tasks).where(eq(tasks.user_id, userId));
};

// Tạo task mới
export const createTask = async (data: {
  user_id: number;
  title: string;
  description?: string;
  status?: string;
  due_date?: Date;
}) => {
  const [newTask] = await db
    .insert(tasks)
    .values({
      ...data,
      due_date: data.due_date ? new Date(data.due_date) : undefined,
      status: data.status || "pending",
    })
    .returning();
  return newTask;
};

// Cập nhật task
export const updateTask = async (
  taskId: number,
  userId: number,
  data: {
    title?: string;
    description?: string;
    status?: string;
    due_date?: Date;
  }
) => {
  const [updatedTask] = await db
    .update(tasks)
    .set({
      ...data,
      due_date: data.due_date ? new Date(data.due_date) : undefined,
    })
    .where(and(eq(tasks.id, taskId), eq(tasks.user_id, userId))) // chỉ update task của chính user
    .returning();

  return updatedTask;
};


export const deleteTask = async (taskId: number, userId: number) => {
  const deletedCount = await db
    .delete(tasks)
    .where(and(eq(tasks.id, taskId), eq(tasks.user_id, userId))); // ✅ gộp điều kiện
  return deletedCount;
};
