import { createServer, Server as httpServer } from "http";
import { io as Client, Socket as clientSocket } from "socket.io-client";
import { Server, Socket } from "socket.io";
import { AddressInfo } from "net";
import request from 'supertest';
import { app } from ".";

describe("my awesome project", () => {
  let io: Server;
  let serverSocket: Socket; 
  let clientSocket: clientSocket;

  beforeAll((done) => {
    const httpServer: httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = (<AddressInfo>httpServer.address()).port;
      clientSocket = Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  }, 30000);

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("Catch-all route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "Express + TypeScript Server" });
  });

  it('console.log when having a socket connection', () => {
    const logSpy = jest.spyOn(console, 'log');

    io.on('connection', () => {
      expect(logSpy).toHaveBeenCalledWith('Connected socket');
    })
  });

  test("should work", (done) => {
    clientSocket.on("orange", (arg) => {
      expect(arg).toBe("click");
      done();
    });
    serverSocket.emit("orange", "click");
  });

  test("should work (with ack)", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg: string | number) => {
      expect(arg).toBe("hola");
      done();
    });
  });
});