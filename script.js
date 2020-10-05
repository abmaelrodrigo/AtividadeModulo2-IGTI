import { promises as fs } from 'fs';
//init();
let states = new Object();
let cities = new Object();
let arrayCidades = [];
let cidadesEmJson = {
  cidades: arrayCidades,
};

writeReadJson();

async function writeReadJson() {
  try {
    states = JSON.parse(
      await fs.readFile('./cidades-estados-brasil-json/Estados.json')
    );
    cities = JSON.parse(
      await fs.readFile('./cidades-estados-brasil-json/Cidades.json')
    );

    /*states.map((estados) => {
      const { ID, Sigla, Nome } = estados;
      return {
        ID: ID,
        Sigla: Sigla,
        Nome: Nome,
      };
    });*/

    states.forEach((estados) => {
      const { ID, Sigla, Nome } = estados;

      cities.forEach((cidades) => {
        const { ID, Nome, Estado } = cidades;
        if (estados.ID === cidades.Estado) {
          //console.log('oi');
          //let arrayCidadesEspecificas =
          createJsonFile(estados, cidades);
        }
      });
      //let id = ID;
      // await fs.writeFile('teste.json', JSON.stringify(jsonObj));

      //console.log(Sigla);
    });
  } catch (err) {
    console.log(err);
  }
}

async function createJsonFile(estados, cities) {
  try {
    let nameOfFile = estados.Sigla + '.json';

    if (estados.ID === '3') {
      await fs.writeFile(nameOfFile, JSON.stringify(cidadesEmJson));
      const data = JSON.parse(await fs.readFile(nameOfFile));
      data.cidades.push(cities.Nome);
      //arrayCidades.push(cities.Nome);
      await fs.writeFile(nameOfFile, JSON.stringify(data));
      //console.log(JSON.stringify(data));
    }
  } catch (err) {
    console.log(err);
  }
  //console.log(cidadesEmJson);
}
