
import express from "express";
import tasksRoutes from "./routes/tasksRoutes";
import usersRoutes from "./routes/usersRoutes"; 

const app = express();
app.use(express.json());

app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);

export default app;
