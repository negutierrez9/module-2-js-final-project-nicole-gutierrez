const searchForm = document.querySelector('form'); 
const searchBarDiv = document.querySelector('.search-result'); 
const container = document.querySelector('.container')
let searchInput = ''; 
let dropdown = document.querySelector('.dropdown')

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTcwZDVlMTYxYzgxNWI2NGU4ZWZiYjliZTdkZGYwNCIsInN1YiI6IjY1ZDRjZGNhNTZiOWY3MDE2MmIxOGI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kBgcgZhDrfOQwGPJo_tH81-D0Nr8HIUJJlFasrkvdD8'
    }
  };

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    searchInput = e.target.querySelector('input').value; 
    fetchAPI(); 
}); 

async function fetchAPI () {
    const baseURL = `https://api.themoviedb.org/3/search/multi?query=${searchInput}&include_adult=false&language=en-US&page=1`; 
    const response = await fetch(baseURL, options); 
    const data = await response.json(); 
    generateHTML(data.results);
    console.log(data) 
}

function generateHTML(results) {
    container.classList.remove('initial'); 
    let generatedHTML = ''; 
    const imgURL = "http://image.tmdb.org/t/p/original/"
    results.map(result => {
        generatedHTML +=
        `
        <div class="item">
            <img src="${!result.poster_path ? "./Sad photo icon.jpeg" : imgURL + result.poster_path}" alt="poster">
            <div class="top-flex-container">
                <h1 class="title">${!result.title ? result.name : result.title}</h1>
                <a class="liked-movies" href="#"><ion-icon name="heart-outline"></ion-icon></a>
            </div>
            <div class="bottom-flex-container">
                <p class="item-data">Rating: </p>
                <a href="#" class="rating-button">
                    <ion-icon name="star-outline"></ion-icon>
                </a>
                <a href="#" class="rating-button">
                    <ion-icon name="star-outline"></ion-icon>
                </a>
                <a href="#" class="rating-button">
                    <ion-icon name="star-outline"></ion-icon>
                </a>
                <a href="#" class="rating-button">
                    <ion-icon name="star-outline"></ion-icon>
                </a>
                <a href="#" class="rating-button">
                    <ion-icon name="star-outline"></ion-icon>
                </a>
            </div>
            <p class="item-data">Date: ${!result.first_air_date ? result.release_date : result.first_air_date}</p>
        </div>
        `
    }); 
    searchBarDiv.innerHTML = generatedHTML; 
}

dropdown.addEventListener('click', (e) => {
    dropdown.classList.contains('closed') ? dropdown.classList.remove('closed') : dropdown.classList.add('closed'); 
})

