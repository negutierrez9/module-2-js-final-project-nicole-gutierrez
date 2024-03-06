const searchForm = document.querySelector('form'); 
const searchBarDiv = document.querySelector('.search-result'); 
const container = document.querySelector('.container')
let searchInput = ''; 
let dropdown = document.querySelector('.dropdown'); 

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    //   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTcwZDVlMTYxYzgxNWI2NGU4ZWZiYjliZTdkZGYwNCIsInN1YiI6IjY1ZDRjZGNhNTZiOWY3MDE2MmIxOGI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kBgcgZhDrfOQwGPJo_tH81-D0Nr8HIUJJlFasrkvdD8'
    }
  };

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    searchInput = e.target.querySelector('input').value; 
    fetchAPI(); 
}); 

async function fetchAPI () {
    // const apiKey = 'da70d5e161c815b64e8efbb9be7ddf04'
    const baseURL = `https://api.themoviedb.org/3/search/multi?query=${searchInput}&api_key=da70d5e161c815b64e8efbb9be7ddf04&include_adult=false&language=en-US&page=1`; 
    const response = await fetch(baseURL, options); 
    const data = await response.json(); 
    generateHTML(data.results);
    // console.log(data.results) 
}

function generateHTML(results) {
    container.classList.remove('initial'); 
    // let generatedHTML = ''; 
    searchBarDiv.innerHTML = ``; 
    const imgURL = "http://image.tmdb.org/t/p/original/"
    results.forEach(result => {
        // generatedHTML +=
        // `
        // <div class="item">
        //     <img src="${!result.poster_path ? "./Sad photo icon.jpeg" : imgURL + result.poster_path}" alt="poster">
        //     <div class="top-flex-container">
        //         <h1 class="title">${!result.title ? result.name : result.title}</h1>
        //         <a class="liked-movies" href="#"><ion-icon name="heart-outline"></ion-icon></a>
        //     </div>
        //     <div class="bottom-flex-container">
        //         <p class="item-data">Rating: </p>
        //         <a href="#" class="rating-button">
        //             <ion-icon name="star-outline"></ion-icon>
        //         </a>
        //         <a href="#" class="rating-button">
        //             <ion-icon name="star-outline"></ion-icon>
        //         </a>
        //         <a href="#" class="rating-button">
        //             <ion-icon name="star-outline"></ion-icon>
        //         </a>
        //         <a href="#" class="rating-button">
        //             <ion-icon name="star-outline"></ion-icon>
        //         </a>
        //         <a href="#" class="rating-button">
        //             <ion-icon name="star-outline"></ion-icon>
        //         </a>
        //     </div>
        //     <p class="item-data">Date: ${!result.first_air_date ? result.release_date : result.first_air_date}</p>
        // </div>
        // `
        const item = document.createElement('div');
        item.className = 'item'; 
        
        const image = document.createElement('img'); 
        image.src = !result.poster_path ? "./Sad photo icon.jpeg" : imgURL + result.poster_path

        const topContainer = document.createElement('div'); 
        const bottomContainer = document.createElement('div'); 
        topContainer.className = 'top-flex-container';
        bottomContainer.className = 'bottom-flex-container';

        const date = document.createElement('p'); 
        date.className = 'item-data'; 
        date.textContent = `Date: ${!result.first_air_date ? result.release_date : result.first_air_date}`

        // Top Container Child Elements
        const title = document.createElement('h1'); 
        title.className = 'title'; 
        title.textContent = !result.title ? result.name : result.title; 
        const heart = document.createElement('a')
        heart.innerHTML = '<ion-icon name="heart-outline"></ion-icon>'
        heart.className = 'liked-movies'; 
        // Append to top container
        topContainer.appendChild(title); 
        topContainer.appendChild(heart); 

        // Bottom Container Child Elements
        const itemData = document.createElement('p'); 
        itemData.className = 'item-data'; 
        itemData.textContent = 'Rating: '; 
        const ratingButtons = []; 
        for (let i=0; i<5; i++) {
            let starButton = document.createElement('button'); 
            starButton.className = 'rating-button'; 
            starButton.innerHTML = `<ion-icon name="star-outline"></ion-icon>`; 

            starButton.addEventListener('click', () => {
                for (let j = 0; j<= i; j++) {
                    ratingButtons[j].innerHTML = `<ion-icon name="star"></ion-icon>`
                }
            })

            ratingButtons.push(starButton); 
        }
        // Append to Bottom Container 
        bottomContainer.appendChild(itemData); 
        ratingButtons.forEach((button) => {
            bottomContainer.appendChild(button)
        }); 

        // Append all elements to main item 
        item.appendChild(image); 
        item.appendChild(topContainer); 
        item.appendChild(bottomContainer); 
        item.appendChild(date); 

        // // Append item results to searchBarDiv
        searchBarDiv.appendChild(item); 
        // console.log(searchBarDiv); 

        // let isHeartFilled = false;
        let isHeartFilled = isMovieLiked(result);  

        heart.addEventListener('click', () => {
            isHeartFilled = !isHeartFilled; 
            heart.innerHTML = isHeartFilled ? `<ion-icon name="heart"></ion-icon>` : `<ion-icon name="heart-outline"></ion-icon>`; 
            if (isHeartFilled) {
                addMovieToStorage(result); 
            } else {
                removeMovieFromStorage(result); 
            }
        }); 
    }); 
    // searchBarDiv.innerHTML = generatedHTML; 
    // searchBarDiv.appendChild(item);
    console.log(searchBarDiv)
}

dropdown.addEventListener('click', (e) => {
    dropdown.classList.contains('closed') ? dropdown.classList.remove('closed') : dropdown.classList.add('closed'); 
}); 

function addMovieToStorage(movie) {
    let likedMovies; 
    if (localStorage.getItem('items') === null) {
        likedMovies = []; 
    } else {
        likedMovies = JSON.parse(localStorage.getItem('items'))
    }

    // Add new movie to array 
    likedMovies.push(movie); 

    // Convert to JSON String and set to local storage
    localStorage.setItem('items', JSON.stringify(likedMovies)); 
}

function removeMovieFromStorage(movie) {
    let likedMovies;
    if (localStorage.getItem('items') === null) {
        return; // If local storage is empty, nothing to remove
    } else {
        likedMovies = JSON.parse(localStorage.getItem('items'));
    }

    // Find the index of the movie in the likedMovies array
    const index = likedMovies.findIndex(item => item.id === movie.id);

    // If the movie is found, remove it from the array
    if (index !== -1) {
        likedMovies.splice(index, 1);
    }

    // Update local storage with the modified array
    localStorage.setItem('items', JSON.stringify(likedMovies));
}

function isMovieLiked(movie) {
    const likedMovies = JSON.parse(localStorage.getItem('items')) || []; 
    for (let i = 0; i < likedMovies.length; i++) {
        if (likedMovies[i].id === movie.id) {
            return true; // Found a match, movie is liked
        }
    }
    return false; // No match found, movie is not liked
}
