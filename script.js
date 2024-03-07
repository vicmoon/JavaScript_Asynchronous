'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getCountryData = function(country){
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${country}?fullText=true`); 
request.send(); 

request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    console.log(data.languages);

     // Extract languages and currencies
     const languages = Object.values(data.languages).join(', ');
     // Extract currencies
    const currencies = Object.keys(data.currencies).map(currencyCode => {
        const currency = data.currencies[currencyCode];
        return `${currency.name} (${currency.symbol})`;
    }).join(', ');
 
    const html  = `
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
      <p class="country__row"><span>💰</span>${currencies}</p>
    </div>
  </article>

    `

    countriesContainer.insertAdjacentHTML('beforeend', html); 
    countriesContainer.style.opacity= 1;
}); 
};


getCountryData('France');
getCountryData('Portugal'); 
getCountryData('Romania'); 
getCountryData('Czechia');
getCountryData('Germany');
