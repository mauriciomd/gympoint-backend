import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

// Dependency injection
import '../../../modules/users/providers';
import '../../container';

// Database connection
import '../typeorm';

// Middlewares
import errorHandler from './middlewares/errorHandler';

// App routes
import appRoutes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(appRoutes);
app.use(errorHandler);

export default app;
