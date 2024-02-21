const searchForm = document.querySelector('form'); 
const searchBarDiv = document.querySelector('.search-result'); 
const container = document.getElementsByClassName('container')
let searchInput = ''; 
const APP_KEY = 'da70d5e161c815b64e8efbb9be7ddf04'

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
    const baseURL = 'https://api.themoviedb.org/3/search/multi?query=solo%20leveling&include_adult=false&language=en-US&page=1'; 
    const response = await fetch(baseURL, options); 
    const data = await response.json(); 
    generateHTML(data.results);
    console.log(data) 
}

function generateHTML(results) {
    let generatedHTML = ''; 
    const imgURL = "http://image.tmdb.org/t/p/original/"
    results.map(result => {
        generatedHTML +=
        `
        <div class="item">
            <img src="${imgURL + result.poster_path}" alt="solo leveling poster">
            <div class="flex-container">
                <h1 class="title">${result.name}</h1>
                <a class="view-button" href="#">View Movie</a>
            </div>
            <p class="item-data">
                Rating: 
                <button class="rating-button">
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                </button>
            </p>
            <p class="item-data">Date: ${result.first_air_date}</p>
        </div>
        `
    }); 
    searchBarDiv.innerHTML = generatedHTML; 
}

