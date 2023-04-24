import { io as Client, Socket as cSocket } from "socket.io-client";
import { Server, Socket } from "socket.io";
import { AddressInfo } from "net";
import request from 'supertest';
import { app, server as httpServer, io } from ".";

describe("my awesome project", () => {
  let serverSocket: Socket; 
  let clientSocket: cSocket;
  let clientSocketSecond: cSocket ;

  beforeAll((done) => {
    io.on("connection", (socket) => {
      serverSocket = socket;
    });
    const port = (<AddressInfo>httpServer.address()).port;
    console.log(port, "port")
    clientSocket = Client(`http://localhost:${port}`);
    clientSocketSecond = Client(`http://localhost:${port}`);
    clientSocket.on("connect", done);
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("/ (GET)", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "Express + TypeScript Server" });
  });

  it('should console.log when having a socket connection', () => {
    const logSpy = jest.spyOn(console, 'log');

    io.on('connection', () => {
      expect(logSpy).toHaveBeenCalledWith('Connected socket');
    })
  });

  test("should second client receive message after first client emit orange", (done) => {
    clientSocketSecond.on('orange', (data) => {
      expect(data).toEqual(1);
      done();
    });
    clientSocket.emit('orange', 1);
  });
  
  test("should second client receive message after first client emit blue", (done) => {
    clientSocketSecond.on('blue', (data) => {
      expect(data).toEqual(1);
      done();
    });
    clientSocket.emit('blue', 1);
  });
});