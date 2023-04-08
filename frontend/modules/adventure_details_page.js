import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let url = new URLSearchParams(search);
  return url.get("adventure");
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const fetchAdventureDetail = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    const jsonResponse = await fetchAdventureDetail.json();
    return jsonResponse;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  // Get the HTML elements to insert the adventure details
  const nameEl = document.getElementById("adventure-name");
  const subtitleEl = document.getElementById("adventure-subtitle");
  const contentEl = document.getElementById("adventure-content");
  const photoGalleryEl = document.getElementById("photo-gallery");

  // Insert the adventure details into the DOM
  nameEl.textContent = adventure.name;
  subtitleEl.textContent = adventure.subtitle;
  contentEl.textContent = adventure.content;

  // Insert the images into the photo-gallery
  adventure.images.forEach((image) => {
    const imageEl = document.createElement("div");
    imageEl.classList.add("activity-card-image");
    imageEl.style.backgroundImage = `url(${image})`;
    photoGalleryEl.appendChild(imageEl);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  //Getting the HTML Elements to insert to the photo gallery
  const photoGalleryEl = document.getElementById("photo-gallery");

  //Clear the photo gallery content
  photoGalleryEl.innerHTML = `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner h-100" id='carousel-item-parent'>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
  </button>
  </div>`;

  const carouselParentId = document.getElementById("carousel-item-parent");

  images.forEach((image, index) => {
    const carouselItemEl = document.createElement("div");
    index === 0
      ? carouselItemEl.classList.add("carousel-item", "active", "h-100")
      : carouselItemEl.classList.add("carousel-item", "h-100");
    carouselItemEl.innerHTML = `<img src='${image}' class='activity-card-image' alt='...' style='object-fit:cover'/>`;
    carouselParentId.append(carouselItemEl);
  });

  //Create coursel components
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure["available"]) {
    const soldOutPanel = document.getElementById("reservation-panel-sold-out");
    const panelAvailable = document.getElementById(
      "reservation-panel-available"
    );
    panelAvailable.style.display = "block";
    soldOutPanel.style.display = "none";

    const personPerCost = document.getElementById("reservation-person-cost");
    personPerCost.textContent = adventure.costPerHead;
  } else {
    const panelAvailable = document.getElementById(
      "reservation-panel-available"
    );
    const soldOutPanel = document.getElementById("reservation-panel-sold-out");
    panelAvailable.style.display = "none";
    soldOutPanel.style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const reservationCost = document.getElementById("reservation-cost");
  const reservationPerCost = document.getElementById("reservation-person-cost");
  return (reservationCost.innerHTML = persons * adventure.costPerHead);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // console.log(adventure);
  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = {
      name: myForm.elements["name"].value,
      date: myForm.elements["date"].value,
      person: myForm.elements["person"].value,
      adventure: adventure.id,
    };
    // console.log(formData);
    try {
      const response = await fetch(
        `${config.backendEndpoint}/reservations/new`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Success");
        window.location.reload();
      } else {
        alert("Failed");
      }
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    reservedBanner.style.display = "block";
  } else {
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
