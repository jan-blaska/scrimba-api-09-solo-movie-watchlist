const sectionEmptyWatchlistEl = document.getElementById('section-empty-watchlist')
const sectionCardsEl = document.getElementById('section-cards')

let moviesArray = JSON.parse( localStorage.getItem("myWatchlist") )
if (moviesArray.length > 0) {
    if (sectionCardsEl.classList.contains('hidden')) {
        sectionCardsEl.classList.remove('hidden')
    }
    if (!sectionEmptyWatchlistEl.classList.contains('hidden')) {
        sectionEmptyWatchlistEl.classList.add('hidden')
    }
}

function renderMyWatchlist() {  
    const moviesCardsArray = moviesArray.map(movie => {
        return `
            <div class="movie-card">
                <img src=${movie.Poster != "N/A" ? movie.Poster : "/images/no-image.jpg"}>
                <div class="movie-card--desc">
                    <div class="movie-card--desc--header">
                        <h5>${movie.Title}</h5>
                        <i class="fa-solid fa-star" style="color: #FEC654;"></i>
                        <p>${movie.imdbRating != "N/A" ? movie.imdbRating : "not rated"}</p>
                    </div>
                    <div class="movie-card--desc--subheader">
                        <p>${movie.Runtime != "N/A" ? movie.Runtime : "?? min"}</p>
                        <p>${movie.Genre != "N/A" ? movie.Genre : ""}</p>
                        <div id="button-remove-movie-from-watchlist" class="button-remove-movie-from-watchlist" data-removemovie=${movie.imdbID}>
                            <i class="fa-solid fa-circle-minus" style="color: #ffffff;" data-removemovie=${movie.imdbID}></i>
                            <p data-removemovie=${movie.imdbID}>Remove</p>
                        </div>
                    </div>
                    <p class="movie-card--desc--paragraph">${movie.Plot  != "N/A" ? movie.Plot : "plot of the movie is not known"}</p>
                </div>
            </div>
        `
    })
    sectionCardsEl.innerHTML = moviesCardsArray.join('')
}

document.addEventListener('click', function(e) {
    if (e.target.dataset.removemovie) {
        moviesArray = moviesArray.filter((movie) => {
            return movie.imdbID !== e.target.dataset.removemovie
        })
        localStorage.clear()
        localStorage.setItem("myWatchlist", JSON.stringify(moviesArray))
        if (moviesArray.length === 0) {
            if (!sectionCardsEl.classList.contains('hidden')) {
                sectionCardsEl.classList.add('hidden')
            }
            if (sectionEmptyWatchlistEl.classList.contains('hidden')) {
                sectionEmptyWatchlistEl.classList.remove('hidden')
            }
        }
        renderMyWatchlist()
    }
})

renderMyWatchlist()
