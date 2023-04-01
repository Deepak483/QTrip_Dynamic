import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const fetchCity = await fetch(config.backendEndpoint+"/cities");
    const fetchData = await fetchCity.json();
    return fetchData;
  }
  catch(e){
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let divElement = document.createElement("div");
  divElement.className = "col-md-6 col-sm-6 col-lg-3 mb-4";
  divElement.innerHTML = ` <a href="pages/adventures/?city=${id}" id='${id}'>
  <div class="tile">
   <img
    src="${image}"
    class="img-fluid rounded"
    alt="${id} image"
   />
   <div class="tile-text">
    <h5 class="text-light text-center">${city}</h5>
    <p class="text-light text-center">${description}</p>
   </div>
  </div>
 </a>`;
  let dataElement = document.getElementById('data');
  dataElement.appendChild(divElement);

}

export { init, fetchCities, addCityToDOM };
