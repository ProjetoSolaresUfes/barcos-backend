import { Socket } from "socket.io";
import { saveFileToStorage } from "../utils/firebase";
import { getDataAtualBrasil } from "../utils/dataProcessing";

export function handleRaceHistory(
  socket: Socket,
  io: any,
  dataHistory: string[],
  record: boolean[],
  speed: string[],
  namePilot: string[]
): void {
  setTimeout(() => {
    socket.emit("recordStatus", record.length > 0);
  }, 3000);

  //ordem dos dados:
  //corrente do motor, corrente baterias, temperatura, humidade, tensão alimentação, estadoStringSolar1, estadoStringSolar2, tensão saída MPPT, tensão entrada MPPT, corrente MPPT
  socket.on("newinfo", (data: string) => {
    if (record.length > 0) {
      const updateAt = getDataAtualBrasil().format('DD/MM/YYYY HH:mm:ss')
      const newData = data + "," + speed[0] + "," + updateAt + "," + namePilot[0];
      console.log(newData);
      dataHistory.push(newData);
    }
  });

  socket.on("record", () => {
    if (record.length === 0) {
      record.push(true);
    }
    else {
      record.pop();
      dataHistory.unshift('correnteMotor,correnteBaterias,temperatura,umidade,tensaoAlimentacaoPCB,estadoStringSolar1,estadoStringSolar2,tensaoSaidaMPPT,tensaoEntradaMPPT,correnteMPPT');
      saveFileToStorage(dataHistory);
    }
    console.log(record.length > 0);
    io.emit("recordStatus", record.length > 0);
  });
};
