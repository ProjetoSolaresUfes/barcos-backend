import { Socket } from "socket.io";
import { convertData } from "../utils/dataProcessing";

export function handleBoat(socket: Socket, io: any, speed: string[], namePilot: string[]): void {

  socket.on("newinfo", (data: string) => {
    // console.log(data);
    let newData = convertData(data);
    newData.velocidadeBarco = speed[0];
    io.emit("info", newData);
  });

  socket.on("speed", (data: string) => {
    speed.pop();
    speed.push(data);
    io.emit("speedInfo", data);
    // console.log(speed[0]);
  });

  socket.on("newName", (data: string) => {
    namePilot.pop();
    namePilot.push(data);
    io.emit("nameInfo", data);
    console.log(namePilot[0]);
  });

};
