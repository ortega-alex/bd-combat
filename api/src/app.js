import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { publicRoute } from './routes';

const app = express();
const httpServer = http.Server(app);

const io = new Server(httpServer);
// onSocket(io);

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// STATIC FILES
app.use(express.static(path.join(__dirname, '/public')));

// PUBLIC ROUTES
app.use('/api/v1', publicRoute);

// GLOBAL VARIABLES
app.locals.io = io;

export default httpServer;
