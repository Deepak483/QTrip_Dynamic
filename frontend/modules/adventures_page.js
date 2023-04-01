
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    // const cityName = getCityFromURL(city);
    const response = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  try {
    adventures.forEach((element) => {
      const divElement = document.createElement("div");
      divElement.className = "col-sm-6 col-lg-3 mb-3";
      divElement.innerHTML = `<a id='${element.id}' href="detail/?adventure=${element.id}">
      <div class="card activity-card" >
      <img src="${element.image}" class="" alt="${element.name}">
      <div class="category-banner">${element.category}</div>
      <div class="card-body col-md-12 md-2">
        <div class="d-flex justify-content-between">
          <p>${element.name}</p>
          <p>₹${element.costPerHead}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p>Duration</p>
          <p>${element.duration} Hours</p>
        </div>
      </div>
    </div>
  </a>`;
      const dataElement = document.getElementById("data");
      dataElement.append(divElement);
    });
  } catch (e) {
    return null;
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  if(!low && !high){
    return list;
  }

  if(!low){
    return list.filter(adventure=>adventure.duration<=high);
  }

  if(!high){
    return list.filter(adventure=>adventure.duration>=low);
  }

  return list.filter(adventure=>adventure.duration>=low && adventure.duration <=high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  if(!categoryList || categoryList.length===0){
    return list;
  }
  return list.filter(adventure=>categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    let filteredList = list;
    if(filters.category && filters.category.length>0){
      filteredList = filterByCategory(filteredList,filters.category);
    }

    if(filters.duration && filters.duration.length>0){
      const durationFilter = filters.duration.split('-');
      const low = parseInt(durationFilter[0],10);
      const high = parseInt(durationFilter[1],10);
      filteredList = filterByDuration(filteredList,low,high);
    }

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = localStorage.getItem('filters');
  return filters? JSON.parse(filters):null;

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categories = filters.category;
  const categoryListElement = document.getElementById('category-list');
  categoryListElement.innerHTML = '';
  categories.forEach((category)=>{
    const pillElement = document.createElement('div');
    pillElement.className = 'category-filter';
    pillElement.innerHTML = `${category} <span class='' ></span>`
    categoryListElement.appendChild(pillElement);
  });

  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
