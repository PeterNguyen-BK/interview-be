import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import socketIO from 'socket.io';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const server: http.Server = http.createServer(app);
const io: socketIO.Server = new socketIO.Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

let dataToSend = {
  orange: 0,
  blue: 0
}

io.on('connection', (socket: socketIO.Socket) => {
  console.log('Connected socket', socket.id)

  socket.on('orange', (data) => {
    console.log(data)
    dataToSend.orange++;
    socket.broadcast.emit('orange', dataToSend.orange)
  })
  socket.on('blue', (data) => {
    console.log(data)
    dataToSend.blue++;
    socket.broadcast.emit('blue', dataToSend.blue)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected socket');
  })
})

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});