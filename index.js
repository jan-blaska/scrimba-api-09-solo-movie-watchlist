const searchBarEl = document.getElementById('search-bar')
const inputMovieNameEl = document.getElementById('input-movie-name')
const sectionCardsEl = document.getElementById('section-cards')


/* Fetching the data from https://www.omdbapi.com/ using the search parameter 's' */
/* 'apikey' is unique key which was recieved by email after the registration on the website */
searchBarEl.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(`http://www.omdbapi.com/?apikey=76d62778&s=${inputMovieNameEl.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.Response === "True") {
                console.log("test")
                renderSearchResults(data.Search)
            } else {
                console.log("Not found")
            }
        })
})

function renderSearchResults(moviesArray) {
    const moviesCardsArray = moviesArray.map(movie => {
        return `
            <div class="movie-card">
                <img src=${movie.Poster}>
                <div class="movie-card--desc">
                    <div class="movie-card--desc--header">
                        <h5>${movie.Title}</h5>
                        <i class="fa-solid fa-star" style="color: #FEC654;"></i>
                        <p>8.1</p>
                    </div>
                    <div class="movie-card--desc--subheader">
                        <p>116 min</p>
                        <p>Drama, Mystery, Sci-fi</p>
                        <div id="button-add-movie-to-watchlist" class="button-add-movie-to-watchlist">
                            <i class="fa-solid fa-circle-plus" style="color: #ffffff;"></i>
                            <p>Watchlist</p>
                        </div>
                    </div>
                    <p class="movie-card--desc--paragraph">A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.</p>
                </div>
            </div>
        `
    })
    sectionCardsEl.innerHTML = moviesCardsArray.join('')
}

/*
document.getElementById('button-add-movie-to-watchlist').addEventListener('click', () => {
    console.log("add movie to watchlist button clicked")
})
*/

