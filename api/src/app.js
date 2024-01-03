import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const httpServer = http.Server(app);

const io = new Server(httpServer);
// onSocket(io);

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GLOBAL VARIABLES
app.locals.io = io;

export default httpServer;
