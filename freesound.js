const api = "https://freesound.org/apiv2/search/text/?query="
const fields = "&page_size=40&sort=score&fields=description,previews,duration"
const token = "&token=ho6JWkyWgzhYRLzctaX7I77ThnsfDkvviuoarmxJ"


var lastData = {};
var lastQuery = "";


function search() {
    var searchInput = document.getElementById("search");
    var query = searchInput.value;
    if (query !== lastQuery) {
        var requestURL = api + query + fields + token
        fetch(requestURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            lastData = data;
            clearHistory();
            addToHistory(playRandom(data));
        });
    } else if (query !== "") {
        addToHistory(playRandom(lastData));
    }
    lastQuery = query;
}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function addToHistory(description) {
    let histList = document.getElementById("history");
    let newLi = document.createElement("li");
    newLi.innerText = description;
    histList.appendChild(newLi);
}

function clearHistory() {
    let histList = document.getElementById("history");
    histList.innerHTML = "";
}

function playRandom(data) {
    random = randomIntFromInterval(0, data.results.length-1);
    console.log(random, data.results[random].description);
    var previewSrc = data.results[random].previews['preview-hq-mp3'];
    var audio = document.getElementById("player");
    audio.src = previewSrc;
    audio.load();
    audio.play();
    return data.results[random].description;
}
