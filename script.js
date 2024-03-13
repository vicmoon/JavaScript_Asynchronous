// 'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity =1; 

}; 

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

// // // ////////////////////////////////////////




// // // const getCountryandBorder = function(country){

// // // //AJAX call country 1 
// // // const request = new XMLHttpRequest();
// // // request.open('GET', `https://restcountries.com/v3.1/name/${country}?fullText=true`); 
// // // request.send(); 

// // // request.addEventListener('load', function(){
// // //     const [data] = JSON.parse(this.responseText);
// // //     console.log(data);

// // //     //render country 1 
// // //     renderCountry(data); 

// // //   //Get neighbour 

// // //   const [neighbours ]= data.borders;
// // //   if(!neighbours) return;

// // //   // AJAX call for each neighboring country
// // //   const request2 = new XMLHttpRequest(); // Create a new request object
// // //   request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbours}`); // Use request2
// // //   request2.send(); 

// // //   request2.addEventListener('load', function(){
// // //       const neighbourData = JSON.parse(this.responseText);
// // //       console.log(neighbourData);

// // //       // Render neighboring country
// // //       renderCountry(neighbourData, 'neighbour'); // Pass the neighbour code as className
// // //   });
// // // });
// // // };
// // // getCountryandBorder('France');


// // // const request= fetch('https://restcountries.com/v3.1/name/France'); 
// // // console.log(request);


// // // const getCountryData = function(country){
// // //     fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){
// // //         console.log(response);
// // //         return response.json(); // a new promis
// // //     }).then(function(data){
// // //         console.log(data);
// // //         renderCountry(data[0]);
// // //     })

// // // }
// // const getJSON = function(url, errorMsg = "Something went wrong"){
// //      return  fetch(url)
// //     .then((response) => { 
// //         if(!response.ok)
// //         throw new Error(`${errorMsg}(${response.status})`)
// //         return response.json()
// //     }
// //     )}; 


// // const getCountryData = function(country){
// //     //country 1 
// //     getJSON(`https://restcountries.com/v3.1/name/${country}`,'Contry not found' )
// //     .then((data) => {
// //         renderCountry(data[0])
// //         const neighbor = data[0].borders?.[0]
// //         if(!neighbor) throw new Error('No neighbour found!');


// //     //Country 2
// //      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbor}`, `Contry not found. Error:" ${err.message}" `);
// //      })
    
// //     .then(data => renderCountry(data, 'neighbour'))
// //     .catch(err => {
// //         renderError(`Something is wrong 💥💥💥. Error:" ${err.message}" ` )
// //     })
// //     .finally(() => {
// //         countriesContainer.style.opacity = 1; 
// //     })
// // }; 


// // btn.addEventListener('click', function(){
// //     getCountryData('Germany');
// // }); 




// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => { 
//         console.log(response);
//         if(!response.ok)
//         throw new Error(`Country not found (${response.status})`)
//         return response.json()
//     })// a new promis 
//     .then((data) => {
//         renderCountry(data[0])
//         const neighbor = data[0].borders?.[0]
//         return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//      })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//         console.error(`${err}`),
//         renderError(`Something is wrong 💥💥💥. Error:" ${err.message}" ` )
//     })
//     .finally(() => {
//         countriesContainer.style.opacity = 1; 
//     })
// }; 


// // btn.addEventListener('click', function(){
// //     getCountryData('Germany');
// // }); 



// // getCountryData('sjrjkjrk');



// const whereAmI = function (lat, lng) {
//     fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//       .then(res => {
//         if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         console.log(data);
//         console.log(`You are in ${data.city}, ${data.country}`);
  
//         return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//       })
//       .then(res => {
//         if (!res.ok) throw new Error(`Country not found (${res.status})`);
  
//         return res.json();
//       })
//       .then(data => renderCountry(data[0]))
//       .catch(err => console.error(`${err.message} 💥`));
//   };
//   whereAmI(52.508, 13.381);
//   whereAmI(19.037, 72.873);
//   whereAmI(-33.933, 18.474);



// console.log('Test Start');  // fist logs
// setTimeout(() => console.log('0 sec timer'), 0);   // executed last 
// Promise.resolve('Resolved promise').then(res => console.log(res)); // microtask queue will be executed first 
// Promise.resolve('Resolved promise 2').then(res => {
//     for(let i=0; i< 10000000; i++){}
//     console.log(res)})
// console.log('Test end'); // fist logs 




// Create a Simple promise


// const loteryPromise = new Promise(function(resolve, reject){
// console.log('Lotery draw is happening 🪄 ');
// setTimeout(function() {
//     if(Math.random() >= 0.5){ // to set the Promise as fullfilled we call the resolved function 
//         resolve('You win!💥')
//     }else{
//         reject(new Error ('You lost 🥲'));
//     }
// }, 2000)
// });

// loteryPromise.then(res => console.log(res)).catch(err => console.error(err));



// Promisifying set time out 

const wait = function(seconds){
return new Promise(function(resolve){
    setTimeout(resolve, seconds *1000);
});
};

// wait(2).then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1); 
// }).then(() => {
//     console.log("I waited for 1 second");
// });


//Promisify the Geolocation API 

const getPosition =  function (){
 return new Promise(function(resolve, reject){
    // navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err)); 
    navigator.geolocation.getCurrentPosition(resolve, reject); 
 });
};
// getPosition().then(pos => console.log(pos)); 

const whereAmI = function () {
  getPosition().then(pos=> {
    const {latitude:lat, longitude: lng} = pos.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`) 
  })

          .then(res => {
            if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
            return res.json();
          })
          .then(data => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);
      
            return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
          })
          .then(res => {
            if (!res.ok) throw new Error(`Country not found (${res.status})`);
      
            return res.json();
          })
          .then(data => renderCountry(data[0]))
          .catch(err => console.error(`${err.message} 💥`));
      };

    
    btn.addEventListener('click', whereAmI); 


    const imgContainer = document.querySelector('.images');

    const createImage = function(imgPath){
        return new Promise(function(resolve, reject){
           const img =  document.createElement('img'); 
           img.src = imgPath; 
           console.log(imgPath);

           img.addEventListener('load', function(){
             imgContainer.append(img); 
             resolve(img); 
           }); 

           img.addEventListener('error', function(){
            reject (new Error('Image not found')); 
           });
        });
    };


    let currentImg; 

    createImage('img/img-1.jpg')
    .then(img => {
        currentImg= img;
        console.log('Image 1 loaded');
        return wait(2)
    })
    .then(()=> {
        currentImg.style.display = 'none';
        return(createImage('img/img-2.jpg').then(img => {
            console.log('Image 2 loaded');
            return wait(2); 
        }))
    })
    .then(img => {
       currentImg= img;
        return(createImage('img/img-3.jpg').then(img => {
            console.log('Image 3 loaded');
            return wait(2); 
        }))
    })
    .then(()=> currentImg.style.display = 'none')
    .catch(err => console.log(err)); 