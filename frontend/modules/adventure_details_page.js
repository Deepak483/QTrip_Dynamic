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
  photoGalleryEl.innerHTML = "";

  //Create coursel components
  const carousel = document.createElement("div");
  carousel.classList.add("carousel", "slide");
  carousel.setAttribute("id", "carouselExampleIndicators");
  carousel.setAttribute("data-bs-ride", "carousel");

  const indicators = document.createElement("div");
  indicators.classList.add("carousel-indicators");
  carousel.appendChild(indicators);

  const inner = document.createElement("div");
  inner.classList.add("carousel-inner");
  carousel.appendChild(inner);

  const prevButton = document.createElement("button");
  prevButton.classList.add("carousel-control-prev");
  prevButton.setAttribute("type", "button");
  prevButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
  prevButton.setAttribute("data-bs-slide", "prev");
  carousel.appendChild(prevButton);

  const prevIcon = document.createElement("span");
  prevIcon.classList.add("carousel-control-prev-icon");
  prevIcon.setAttribute("aria-hidden", "true");
  prevButton.appendChild(prevIcon);

  const prevLabel = document.createElement("span");
  prevLabel.classList.add("visually-hidden");
  prevLabel.textContent = "Previous";
  prevButton.appendChild(prevLabel);

  const nextButton = document.createElement("button");
  nextButton.classList.add("carousel-control-next");
  nextButton.setAttribute("type", "button");
  nextButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
  nextButton.setAttribute("data-bs-slide", "next");
  carousel.appendChild(nextButton);

  const nextIcon = document.createElement("span");
  nextIcon.classList.add("carousel-control-next-icon");
  nextIcon.setAttribute("aria-hidden", "true");
  nextButton.appendChild(nextIcon);

  const nextLabel = document.createElement("span");
  nextLabel.classList.add("visually-hidden");
  nextLabel.textContent = "Next";
  nextButton.appendChild(nextLabel);

  images.forEach((image, index) => {
    const indicator = document.createElement("button");
    indicator.setAttribute("type", "button");
    indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
    indicator.setAttribute("data-bs-slide-to", index.toString());

    if (index === 0) {
      indicator.classList.add("active");
      inner.appendChild(createCarouselItem(image, true));
    } else {
      inner.appendChild(createCarouselItem(image, false));
    }
    indicators.appendChild(indicator);
  });
  photoGalleryEl.appendChild(carousel);

  function createCarouselItem(imageSrc, active) {
    const item = document.createElement("div");
    item.classList.add("carousel-item", "h-100");
    if (active) {
      item.classList.add("active");
    }
    const image = document.createElement("img");
    image.classList.add("d-block", "w-100", "h-100");
    image.setAttribute("style", "object-fit:cover");
    image.setAttribute("src", imageSrc);
    item.appendChild(image);

    return item;
  }
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
  console.log(adventure);
  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = {
      name: myForm.elements["name"].value,
      date: myForm.elements["date"].value,
      person: myForm.elements["person"].value,
      adventure: adventure.id,
    };
    console.log(formData);
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
