const url = 'https://itunes.apple.com/search?term='
const form = document.querySelector('#search-form')
const searchResults = document.querySelector('.search-results')

form.addEventListener('submit', e => {
    e.preventDefault()
    getSongs();
})

function getSongs() {
    let userSearch = document.querySelector(".search-field").value
    // let tempUrl = 'https://proxy-itunes-api.glitch.me/search?term='

    fetch (url + userSearch + "&limit=12")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // console.log(data.results[0].artistViewURL)
            for (let song of data.results) {
                renderResults(song);
            }
        })
}

function renderResults(song) {

    let songContainer = document.createElement('div')
    songContainer.className = 'song-container'


    let songImg = document.createElement('img');
    songImg.classname = 'song-image';
    songImg.src = song.artworkUrl100;

    let songName = document.createElement('p');
    songName.classname = 'song-name';
    songName.innerHTML = song.trackName;

    let artistName = document.createElement('p')
    artistName.classname = 'artist-name'
    artistName.innerHTML = song.artistName



    songContainer.appendChild(songImg)
    songContainer.appendChild(songName);
    songContainer.appendChild(artistName)




    searchResults.appendChild(songContainer);
}
