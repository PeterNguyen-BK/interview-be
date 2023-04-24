import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import socketIO from 'socket.io';

dotenv.config();

export const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.json({message: 'Express + TypeScript Server'});
});

export const server: http.Server = http.createServer(app);
export const io: socketIO.Server = new socketIO.Server(server, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket: socketIO.Socket) => {
  console.log('Connected socket')

  socket.on('orange', (data) => {
    socket.broadcast.emit('orange', data)
  })
  socket.on('blue', (data) => {
    socket.broadcast.emit('blue', data)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected socket');
  })
})

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});