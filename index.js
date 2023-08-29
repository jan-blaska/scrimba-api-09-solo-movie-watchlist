const searchBarEl = document.getElementById('search-bar')
const inputMovieNameEl = document.getElementById('input-movie-name')
const sectionPlaceholderEl = document.getElementById('section-placeholder')
const sectionNotFoundEl = document.getElementById('section-not-found')
const sectionCardsEl = document.getElementById('section-cards')

let moviesArray = []

/* Fetching the data from https://www.omdbapi.com/ using the search parameter 's' */
/* 'apikey' is unique key which was recieved by email after the registration on the website. */
/* After that there is another fetch for each result to get more detailed data, using parameter 'i' for ID of movie. */
searchBarEl.addEventListener('submit', async (e) => {
    e.preventDefault()
    const res = await fetch(`https://www.omdbapi.com/?apikey=76d62778&s=${inputMovieNameEl.value}`)
    const searchResults = await res.json()
    toggleHidden(1)
    if (searchResults.Response === "True") {
        toggleHidden(2)
        moviesArray = []
        await Promise.all(searchResults.Search.map( async (movie) => {
            const movieRes = await fetch(`https://www.omdbapi.com/?apikey=76d62778&i=${movie.imdbID}`)
            const movieData = await movieRes.json()    
            moviesArray.push(movieData)
        }))
        renderSearchResults()
    } else {
        toggleHidden(3)
    }
})

function toggleHidden(parameter) {
    if (parameter === 1) {
        if (!sectionPlaceholderEl.classList.contains('hidden')) {
            sectionPlaceholderEl.classList.add('hidden')
        }
    } else if (parameter === 2) {
        if (sectionCardsEl.classList.contains('hidden')) {
            sectionCardsEl.classList.remove('hidden')
        }
        if (!sectionNotFoundEl.classList.contains('hidden')) {
            sectionNotFoundEl.classList.add('hidden')
        }
    } else if (parameter === 3) {
        if (sectionNotFoundEl.classList.contains('hidden')) {
            sectionNotFoundEl.classList.remove('hidden')
        }
        if (!sectionCardsEl.classList.contains('hidden')) {
            sectionCardsEl.classList.add('hidden')
        }
    }
}

function renderSearchResults() {
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
                        <div id="button-add-movie-to-watchlist" class="button-add-movie-to-watchlist" data-addmovie=${movie.imdbID}>
                            <i class="fa-solid fa-circle-plus" style="color: #ffffff;" data-addmovie=${movie.imdbID}></i>
                            <p data-addmovie=${movie.imdbID}>Watchlist</p>
                        </div>
                    </div>
                    <p class="movie-card--desc--paragraph">${movie.Plot  != "N/A" ? movie.Plot : "plot of the movie is not known"}</p>
                </div>
            </div>
        `
    })
    sectionCardsEl.innerHTML = moviesCardsArray.join('')
}

/* If user clicks on the button "+Watchlist", we firstly create variable with this movie. */
/* Before it is added to localStorage, we check, whether the localStorage already includes (isDuplicate) this movie or not. */
document.addEventListener('click', function(e) {
    if (e.target.dataset.addmovie) {
        const movieToWatchList = moviesArray.filter((movie) => {
            return movie.imdbID == e.target.dataset.addmovie
        })
        let myWatchlistArray = JSON.parse( localStorage.getItem("myWatchlist") )
        if (!myWatchlistArray) {
            myWatchlistArray = []
        }
        let isDuplicate = false;
        myWatchlistArray.forEach(movie => {
            if (movie.imdbID === movieToWatchList[0].imdbID) {
                isDuplicate = true;
            }
        })
        if (!isDuplicate) {
            myWatchlistArray.unshift(movieToWatchList[0])
            localStorage.setItem("myWatchlist", JSON.stringify(myWatchlistArray))
        }
    }
})


