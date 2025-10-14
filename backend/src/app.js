import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import { swaggerUi,specs } from './docs/swagger.js';

const app=express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/tasks',taskRoutes);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));

sequelize.sync();

app.listen(process.env.PORT||5000,()=>console.log(`🚀 Server running on port ${process.env.PORT}`));
