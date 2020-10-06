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
    readFile('Estados.json')
  );
  const cities = JSON.parse(
    readFile('Cidades.json')
  );

  states.forEach((state) => {
    const { ID, Sigla, Nome } = state;
    const citiesOfState = filterCityByState(ID, cities);
    saveFile(`${state.Sigla}.json`, JSON.stringify(citiesOfState, null, 4));
  });
  const top5StatesWithBiggerCities =  filterStatesByNumbeOfCitiesDesc(states);
  const top5StatesWithSmallerCities = filterStatesByNumbeOfCitiesAsc(states).reverse();
  console.log(top5StatesWithBiggerCities);
  console.log(top5StatesWithSmallerCities);
  
  const theBiggestNames = filterTheBiggestCitiesNames(states);
  console.log(theBiggestNames);
  
  const theSmallestNames = filterTheSmallestCitiesNames(states);
  console.log(theSmallestNames);
  
  console.log(theBiggestCityOfAll(states,cities));
  console.log(theSmallestCityOfAll(states,cities));
}

function filterCityByState(stateID, cities) {
  return cities.filter((city) => city.Estado === stateID);
}

function numberOfCities(uf) {
  const number = jsonToObject(readFile(`${uf}.json`)).length;
  return number;
}

//const t = numberOfCities('MG');
//console.log(t);


function filterStatesByNumbeOfCitiesDesc(states) {
    const numberOfCitiesArray = states.map(state=>({...state, count: numberOfCities(state.Sigla)}));
    const sortedArray = numberOfCitiesArray.sort((a,b)=> {return b.count - a.count});
    const fiveCities = sortedArray.slice(0,5).map(state => `${state.Sigla} - ${state.count}`);
    
    return fiveCities;
}

function filterStatesByNumbeOfCitiesAsc(states) {
    const numberOfCitiesArray = states.map(state=>({...state, count: numberOfCities(state.Sigla)}));
    const sortedArray = numberOfCitiesArray.sort((a,b)=> {return a.count - b.count});
    const fiveCities = sortedArray.slice(0,5).map(state => `${state.Sigla} - ${state.count}`);
    
    return fiveCities;
}

function sortByLengthAsc(a,b){
    if(a.Nome.length > b.Nome.length) return 1;
    if(a.Nome.length < b.Nome.length) return -1;
    if(a.Nome.length == b.Nome.length) return a.Nome.localeCompare(b.Nome);
}

function sortByLengthDesc(a,b){
    if(a.Nome.length > b.Nome.length) return -1;
    if(a.Nome.length < b.Nome.length) return 1;
    if(a.Nome.length == b.Nome.length) return a.Nome.localeCompare(b.Nome);
}

function filterTheBiggestCitiesNames(states){
    const biggestCitiesArray = [];
    states.forEach(state => {
        const theBiggestCity = JSON.parse(readFile(`${state.Sigla}.json`)).sort(sortByLengthDesc)[0];
        biggestCitiesArray.push(`${theBiggestCity.Nome} - ${state.Sigla}`)
    })
    
    return biggestCitiesArray;
   
}

function filterTheSmallestCitiesNames(states){
    const smallestCitiesArray = [];
    states.forEach(state => {
        const theSmallestCity = JSON.parse(readFile(`${state.Sigla}.json`)).sort(sortByLengthAsc)[0];
        smallestCitiesArray.push(`${theSmallestCity.Nome} - ${state.Sigla}`)
    })
    
    return smallestCitiesArray;
   
}

function theBiggestCityOfAll(states, cities){
    const citysName = cities.map(city =>({Nome: city.Nome, Estado: city.Estado})).sort(sortByLengthDesc)[0];
    const uf = states.filter(state => state.ID === citysName.Estado)[0];
    return `${citysName.Nome} - ${uf.Nome}`;
}

function theSmallestCityOfAll(states, cities){
    const citysName = cities.map(city =>({Nome: city.Nome, Estado: city.Estado})).sort(sortByLengthAsc)[0];
    const uf = states.filter(state => state.ID === citysName.Estado)[0];
    return `${citysName.Nome} - ${uf.Nome}`;
}


    

