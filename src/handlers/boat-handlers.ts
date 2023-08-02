import { Socket } from "socket.io";
import { convertData } from "../utils/dataProcessing";
import { setCoordenate } from "../utils/setCoordenates";
import { Express } from 'express';


export function handleBoat(socket: Socket, io: any, speed: string[], namePilot: string[], app: Express): void {

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
    console.log(data);
    
    namePilot.pop();
    namePilot.push(data);
    io.emit("nameInfo", data);
    console.log(namePilot[0]);
  });

  socket.on("usarDadosTeste", (usarDadosTeste: boolean) => {    
    if (usarDadosTeste) {      
      const coordenadas = setCoordenate();
      let i = 0;
      app.locals.timerDadosTeste = setInterval(function() {
        if(i === 100){
          i = 0; 
        }
        i++;
        let newData = convertData('', true, coordenadas[i]);        
        io.emit("infoTeste", newData);
      }, 1000);     
    } else {
      if (app.locals.timerDadosTeste != null) {
        clearInterval(app.locals.timerDadosTeste);
      }
    }
  })

};
