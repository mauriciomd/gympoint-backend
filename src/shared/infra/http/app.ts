import 'reflect-metadata';
import express from 'express';

// Dependency injection
import '../../../modules/users/providers';
import '../../container';

const app = express();

export default app;
