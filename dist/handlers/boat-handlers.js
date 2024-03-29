"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBoat = void 0;
const dataProcessing_1 = require("../utils/dataProcessing");
function handleBoat(socket, io, speed, namePilot) {
    socket.on("newinfo", (data) => {
        // console.log(data);
        let newData = (0, dataProcessing_1.convertData)(data);
        newData.velocidadeBarco = speed[0];
        io.emit("info", newData);
    });
    socket.on("speed", (data) => {
        speed.pop();
        speed.push(data);
        io.emit("speedInfo", data);
        // console.log(speed[0]);
    });
    socket.on("newName", (data) => {
        namePilot.pop();
        namePilot.push(data);
        io.emit("nameInfo", data);
        console.log(namePilot[0]);
    });
}
exports.handleBoat = handleBoat;
;
