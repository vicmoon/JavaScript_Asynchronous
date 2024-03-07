'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


const renderCountry = function(data, className = ''){
  // Check if data is an array (for neighbor countries)
  if (Array.isArray(data)) {
      data.forEach(neighbor => {
          // Extract languages if available
          const languages = neighbor.languages ? Object.values(neighbor.languages).join(', ') : 'N/A';
          // Extract currencies if available
          const currencies = neighbor.currencies ? Object.keys(neighbor.currencies).map(currencyCode => {
              const currency = neighbor.currencies[currencyCode];
              return `${currency.name} (${currency.symbol})`;
          }).join(', ') : 'N/A';

          const html  = `
          <article class="country ${className}">
              <img class="country__img" src="${neighbor.flags.png ? neighbor.flags.png : 'N/A'}" />
              <div class="country__data">
                  <h3 class="country__name">${neighbor.name.common}</h3>
                  <h4 class="country__region">${neighbor.region}</h4>
                  <p class="country__row"><span>👫</span>${(+neighbor.population/1000000).toFixed(1)} people</p>
                  <p class="country__row"><span>🗣️</span>${languages}</p>
                  <p class="country__row"><span>💰</span>${currencies}</p>
              </div>
          </article>`;

          countriesContainer.insertAdjacentHTML('beforeend', html); 
          countriesContainer.style.opacity = 1;
      });
  } else {
      // Extract languages if available
      const languages = data.languages ? Object.values(data.languages).join(', ') : 'N/A';
      // Extract currencies if available
      const currencies = data.currencies ? Object.keys(data.currencies).map(currencyCode => {
          const currency = data.currencies[currencyCode];
          return `${currency.name} (${currency.symbol})`;
      }).join(', ') : 'N/A';

      const html  = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flags.png ? data.flags.png : 'N/A'}" />
          <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} people</p>
              <p class="country__row"><span>🗣️</span>${languages}</p>
              <p class="country__row"><span>💰</span>${currencies}</p>
          </div>
      </article>`;

      countriesContainer.insertAdjacentHTML('beforeend', html); 
      countriesContainer.style.opacity = 1;
  }
}


const getCountryandBorder = function(country){
//AJAX call country 1 
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${country}?fullText=true`); 
request.send(); 

request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //render country 1 
    renderCountry(data); 

  //Get neighbour 

  const [neighbours ]= data.borders;
  if(!neighbours) return;

  // AJAX call for each neighboring country
  const request2 = new XMLHttpRequest(); // Create a new request object
  request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbours}`); // Use request2
  request2.send(); 

  request2.addEventListener('load', function(){
      const neighbourData = JSON.parse(this.responseText);
      console.log(neighbourData);

      // Render neighboring country
      renderCountry(neighbourData, 'neighbour'); // Pass the neighbour code as className
  });
});
};
getCountryandBorder('France');