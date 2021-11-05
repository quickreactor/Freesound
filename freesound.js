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
        var previewSrc = data.results[0].previews['preview-hq-mp3'];
        var audio = document.getElementById("player");
        audio.src = previewSrc;
        audio.load();
        //audio.play();
        });
}