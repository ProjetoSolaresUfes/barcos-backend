import { Server } from 'socket.io';
import { handleBoat } from '../handlers/boat-handlers';
import { handleRaceHistory } from '../handlers/history-handlers';

export function configureSockets(io: Server): void {
  let dataHistory: string [] = [];
  let record: boolean [] = [];
  let speed: string [] = ['0'];

  io.on('connection', (socket: any) => {
    console.log('new user: ', socket.id);

    socket.on('disconnect', () => {
      console.log('user disconnected: ', socket.id);
    });

    handleBoat(socket, io, speed);
    handleRaceHistory(socket, io, dataHistory, record, speed)
  });
}
