const out = function (str) {console.log(str);}


//-----------------VARIABLER

let br = document.createElement('br');
let urlstr;
let vejnavne = [];
const inputVejnavn = document.getElementById("inputVejnavn");
const pbSøgEfterVejnavn = document.getElementById("pbSøgEfterVejnavn");
const printAdresser = document.getElementById("printAdresser");

const ddAddresses = document.getElementById("ddAddresses");
const pbFillDd = document.getElementById("pbFillDd");

const inputFjernFraDd = document.getElementById('inputFjernFraDd');
const pbFjernVejnavn = document.getElementById('pbFjernVejnavn');


/* her koder vi et obj - i JSON (javascript object notation)
  method == vi siger at vi vil have den bruger GET i http-protokollen

  param pakket ind i JSON-obj == smart. forklaring
  i js kan det være svært at holde styr på param og deres typer'
  DERFOR er det smart at komme alle de her param ind i et objekt - som vi har gjort i requestObject
  så hvis man laver en funktion med mange param, så er det smart at pakke dem ind i et obj,
  hvor man så kan tilgå værdierne via punktum
*/
const requestObject = {
  method: "GET",
  "content-type": "application/json",
  redirect: "follow"
}
/* Testudprint af requestObject
vi kan tilgå dette js-obj.s attributter vha. punktum == vi kan vi tilgå direkte
out(requestObject.method);
out(requestObject["content-type"]);

 */

//----------------------ADDEVENTLISTENER

/**
 * Når man trykker på knappen hvor der står "Fill Dropdown", så bliver de objekter som er lagt i vejNavne
 * lagt over i dd
 * */
pbFillDd.addEventListener('click', () => vejnavne.forEach(fillDd));

pbSøgEfterVejnavn.addEventListener('click', findVeje);

pbFjernVejnavn.addEventListener('click', fjernVejnavne)

//----------------------FUNKTIONER

/* Henter data fra URL automatisk ved opstart
  Den tager 2 parametre: url + nogle instrukser om hvad den skal gøre
  hvordan henter man en url?
  Vi giver den en url med og så giver vi den vores obj. med (requestObject), hvor vi har pakket vores ting ind
  Når denne er færdig, så returnerer den et response obj - og det responseObj har et json-obj
  Han forklarer nedenstående kode en anden dag. Det handler om promise
 */
function findVeje() {

  urlstr =
    "https://dawa.aws.dk/autocomplete?caretpos=5&fuzzy=&q=" + inputVejnavn.value + "&startfra=adresse&type=adresse";

  out(urlstr);

  fetch(urlstr, requestObject)
    .then(response => response.json())// nu pakker vi json-resultatet ud --> nu har vi fat i et json-obj
    .then(data => gotAddressData(data)); // nu smider vi json-obj. ud i consollen // her kunne man også bare skrive: .then(out)



  //TODO spørg Andreas hvorfor det ikke virker når vi printer vejnavne ud her, men det gør det i gotAddressData-funktionen
  // //out(vejnavne);

}

/**
 * laver collection af (vejnavne + husnr.)-objekter ud fra liste med addresser
 * */
function gotAddressData(data){
  /* for hvert obj i array'et - print det ud
  // data.forEach(dd => out(dd)); // forkortes til: data.forEach(out)
  */
  /*
    nu pakker vi array'et ud
    map ==
      Generally map() method is used to iterate over an array and calling function on every element of array
       vi har en collection af objekter, vi løber det igennem, piller data ud af den og ligger den i en ny collection
    på dd er der en attribut (?) der hedder data
    callback == en dansk fyr, Anders noget, noget med at vi godt vil se typer --> derfor opfandt han typescript
     typescript == lib.d.ts - det er et sprog udenom js som giver os typer
     han lavede også verdens første IDE, C#(C sharp), .net
     hør mere om ham omkring 2:52 i 8.2.-optagelsen


    eks. på map-funktion:
    vibesArr = [1, 2, 3]
    nytArry = vibesArr.map(tal => tal + 1) // nytArr = [2, 3, 4]

  */

  const addressMap = data.map(dd => dd.data); // nu har vi en collection af addresse-obj i addressMap

  // nu piller vi vejnavnene ud i en NY collection
  vejnavne = addressMap.map(adress => adress.adresseringsvejnavn  + " " + adress.husnr);

  out(vejnavne);

  printAdresser.textContent = vejnavne;

}


/*
  OPGAVE til næste gang (9.1)
  1. Vi skal lægge objekterne i en dropdown - vi skal lave knappen som lægger det i dropdownen
  2. Det kunne være grinern hvis man kunne taste noget ind vi kunne lægge i stedet for "havnb" i urlen
 */

/**
 * Når man trykker på "fill dropdown"-knappen så fylder vi vores liste med adresser ind i dropdownen
 * */
function fillDd(item){

  // option, fordi det er det som er i en dd
  let vejnavnElement = document.createElement("option");

  // vi tildeler vores nyoprettede vejnavnElements attribut textContent item-værdien
  // item-værdien == adress.adresseringsvejnavn  + " " + adress.husnr
  vejnavnElement.textContent = item;

  // vi tilføjer det nyoprettede element til vores dd
  ddAddresses.appendChild(vejnavnElement);
}


function fjernVejnavne(){




}

























