const api = "https://freesound.org/apiv2/search/text/?query="
const fields = "&fields=previews,duration"
const token = "&token=ho6JWkyWgzhYRLzctaX7I77ThnsfDkvviuoarmxJ"


var test = {};

function search() {
    var searchInput = document.getElementById("search");
    var query = searchInput.value;
    var requestURL = api + query + fields + token

    fetch(requestURL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        test = data;
        random = randomIntFromInterval(0, data.results.length);
        console.log(random);
        var previewSrc = data.results[random].previews['preview-hq-mp3'];
        var audio = document.getElementById("player");
        audio.src = previewSrc;
        audio.load();
        //audio.play();
        });
}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }