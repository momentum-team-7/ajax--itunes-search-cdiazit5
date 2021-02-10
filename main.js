// const url = 'https://itunes.apple.com/search?term='
const url = 'https://proxy-itunes-api.glitch.me/search?term='
const form = document.querySelector('#search-form')
const searchResults = document.querySelector('.search-results')
let audioPreview = document.querySelector('audio')

form.addEventListener('submit', e => {
    e.preventDefault();
    clearResults()
    getSongs()
    
})

searchResults.addEventListener('click', e => {
    console.log(e.target.parentElement.id)
    if (e.target.parentElement.className === "song-container") {
        
        audioPreview.src = e.target.parentElement.id
        
    }
})


function getSongs() {
    let userSearch = document.querySelector(".search-field").value
    // let tempUrl = 'https://proxy-itunes-api.glitch.me/search?term='

    fetch (url + userSearch + "&limit=12")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            for (let song of data.results) {
                if ( song.trackName !== undefined)
                    renderResults(song);
            }
            // console.log(data.results.trackName)
        })
}

function clearResults() {
    let songs = document.querySelectorAll('.song-container')
    for (let song of songs) {
        song.remove();
    }
}


function renderResults(song) {

    let songContainer = document.createElement('div')
    songContainer.className = 'song-container'
    songContainer.id = song.previewUrl

    let songImg = document.createElement('img');
    songImg.classname = 'song-image';
    songImg.src = song.artworkUrl100;

    let songName = document.createElement('h4');
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
