const searchBarEl = document.getElementById('search-bar')
const inputMovieNameEl = document.getElementById('input-movie-name')
const sectionPlaceholderEl = document.getElementById('section-placeholder')
const sectionCardsEl = document.getElementById('section-cards')


/* Fetching the data from https://www.omdbapi.com/ using the search parameter 's' */
/* 'apikey' is unique key which was recieved by email after the registration on the website. */
/* After that there is another fetch for each result to get more detailed data, using parameter 'i' for ID of movie. */
searchBarEl.addEventListener('submit', async (e) => {
    e.preventDefault()
    sectionPlaceholderEl.classList.add('hidden')
    sectionCardsEl.classList.remove('hidden')

    const res = await fetch(`http://www.omdbapi.com/?apikey=76d62778&s=${inputMovieNameEl.value}`)
    const searchResults = await res.json()

    if (searchResults.Response === "True") {
        const moviesArray = []
        await Promise.all(searchResults.Search.map( async (movie) => {
            const movieRes = await fetch(`http://www.omdbapi.com/?apikey=76d62778&i=${movie.imdbID}`)
            const movieData = await movieRes.json()    
            moviesArray.push(movieData)
        }))
        renderSearchResults(moviesArray)
    } else {
        console.log("Not found")
    }
})


function renderSearchResults(moviesArray) {
    
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
                        <div id="button-add-movie-to-watchlist" class="button-add-movie-to-watchlist">
                            <i class="fa-solid fa-circle-plus" style="color: #ffffff;"></i>
                            <p>Watchlist</p>
                        </div>
                    </div>
                    <p class="movie-card--desc--paragraph">${movie.Plot  != "N/A" ? movie.Plot : "plot of the movie is not known"}</p>
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

