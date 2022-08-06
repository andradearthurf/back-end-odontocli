import express from "express";
import 'express-async-errors';
import { Request, Response, NextFunction } from "express";
import { createConnection } from "typeorm";
import AppError from "./errors/AppError";
import routes from './routes/index';
import { ValidationError } from "yup";
import cors from "cors";

createConnection();

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    return response.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

export { app };
