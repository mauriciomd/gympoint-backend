import 'reflect-metadata';
import express from 'express';

import appRoutes from './routes';

// Dependency injection
import '../../../modules/users/providers';
import '../../container';

// Database connection
import '../typeorm';

const app = express();
app.use(express.json());
app.use(appRoutes);

export default app;
