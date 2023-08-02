import { Data } from "../interfaces/Data";
import moment from 'moment-timezone';

export function getDataAtualBrasil(): moment.Moment {
  const dataAtual = moment().tz('America/Sao_Paulo');
  return dataAtual;
}

export function convertData(str: string, usarDadosTeste: boolean = false, coordernadasTeste: any = {}) : Data {
  let array = str.split(",")

  if (usarDadosTeste) {
        // atualizar dados aleatórios
        let corMotor = 60 + Math.floor(Math.random() * 20);
        let corBaterias = 70 + Math.floor(Math.random() * 20);
        let temp = 25 + Math.floor(Math.random() * 5);
        let umi = Math.floor(Math.random() * 100);
        let tAlimentacaoPCB = 12 + Math.floor(Math.random() * 2);
        let stateStringSolar1 = Math.floor(Math.random() * 2);
        let stateStringSolar2 = Math.floor(Math.random() * 2);
        let tSaidaMPPT = 48 + Math.floor(Math.random() * 3);
        let tEntradaMPPT = 60 + Math.floor(Math.random() * 15);
        let corMPPT =  5 + Math.floor(Math.random() * 10);
        //let updtAt = new Date().toLocaleString();
        let spd = 15 + Math.floor(Math.random() * 5);
        const dadosTeste = {
          correnteMotor: String(corMotor),
          correnteBaterias: String(corBaterias),
          temperatura: String(temp),
          umidade: String(umi),
          tensaoAlimentacaoPCB: String(tAlimentacaoPCB),
          estadoStringSolar1: String(stateStringSolar1),
          estadoStringSolar2: String(stateStringSolar2),
          tensaoSaidaMPPT: String(tSaidaMPPT),
          tensaoEntradaMPPT: String(tEntradaMPPT),
          correnteMPPT: String(corMPPT),
          velocidadeBarco: String(spd),
          latitude: String(coordernadasTeste.lat),
          longitude: String(coordernadasTeste.lon),
          updateAt: getDataAtualBrasil().format('DD/MM/YYYY HH:mm:ss')
        } 

        return dadosTeste;
  }

  const dadosReais = {
    correnteMotor: array[0],
    correnteBaterias: array[1],
    temperatura: array[2],
    umidade: array[3],
    tensaoAlimentacaoPCB: array[4],
    estadoStringSolar1: array[5],
    estadoStringSolar2: array[6],
    tensaoSaidaMPPT: array[7],
    tensaoEntradaMPPT: array[8],
    correnteMPPT: array[9],
    updateAt: getDataAtualBrasil().format('DD/MM/YYYY HH:mm:ss')
  }

  return dadosReais;

}
