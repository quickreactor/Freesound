//const api = "https://freesound.org/apiv2/search/text/?query="
//const fields = "&group_by_pack=1&page_size=40&sort=score&fields=description,previews,duration"
//const token = "&token=ho6JWkyWgzhYRLzctaX7I77ThnsfDkvviuoarmxJ"

const api = new URL("https://freesound.org/apiv2/search/text/?query=");
// Equals "?breed=aegan&categories=sinks%2Cspace"
let paramObject = {
    group_by_pack: 1,
    page_size: 40,
    sort: "score",
    fields: "description,previews,duration",
    token: "ho6JWkyWgzhYRLzctaX7I77ThnsfDkvviuoarmxJ"
}


var lastData = {};
var lastQuery = "";


function search() {
    var searchInput = document.getElementById("search");
    var query = searchInput.value;
    paramObject.query = query;
    api.search = new URLSearchParams(paramObject);
    if (query !== lastQuery) {
        //var requestURL = api + query + fields + token
        fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            lastData = data;
            clearHistory();
            addToHistory(play(data));
        });
    } else if (query !== "") {
        addToHistory(play(lastData));
    }
    lastQuery = query;
}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function addToHistory(details) {
    let histList = document.getElementById("history");
    let newLi = document.createElement("li");
    let newSpan = document.createElement("span");
    newSpan.innerText = details.number + ". ";
    newLi.appendChild(newSpan);
    newLi.innerHTML += details.description;
    histList.appendChild(newLi);
}

function clearHistory() {
    let histList = document.getElementById("history");
    histList.innerHTML = "";
}

function play(data, number=false) {
    if (number) {

    } else {
        number = randomIntFromInterval(0, data.results.length-1);
        console.log(number, data.results[number].description);
    }
    var previewSrc = data.results[number].previews['preview-hq-mp3'];
    var audio = document.getElementById("player");
    audio.src = previewSrc;
    audio.load();
    audio.play();
    return {
        description: data.results[number].description,
        number: number
    }
}


function replay(event) {
    let thing = event.target
    console.log(thing);
    let number = thing.innerText.split(".")[0];
    play(lastData, number)
}