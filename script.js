import * as fs from 'fs';

function readFile(filename) {
  return fs.readFileSync(filename, 'UTF-8');
}

function saveFile(filename, content) {
  fs.writeFileSync(filename, content, 'UTF-8');
}

function jsonToObject(string) {
  return JSON.parse(string);
}

//const states = JSON.parse(readFile('Estados.json'));
//const cities = readFile('Cidades.json');
//console.log(cities);

saveReadFiles();
function saveReadFiles() {
  const states = JSON.parse(
    readFile('./cidades-estados-brasil-json/Estados.json')
  );
  const cities = JSON.parse(
    readFile('./cidades-estados-brasil-json/Cidades.json')
  );

  states.forEach((state) => {
    const { ID, Sigla, Nome } = state;
    const citiesOfState = filterCityByState(ID, cities);
    saveFile(`${state.Sigla}.json`, JSON.stringify(citiesOfState, null, 4));
  });
}

function filterCityByState(stateID, cities) {
  return cities.filter((city) => city.Estado === stateID);
}

function numberOfCities(uf) {
  const number = jsonToObject(readFile(`${uf}.json`)).length;
  return number;
}

const t = numberOfCities('MG');
console.log(t);
