import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch(`${config.backendEndpoint}/reservations`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  const reservationTable = document.getElementById("reservation-table");
  const noReservationBanner = document.getElementById("no-reservation-banner");
  const reservationTableParent = document.getElementById("reservation-table-parent");
  if (reservations.length === 0) {
    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";
  } else {
    noReservationBanner.style.display = "none";
    reservationTableParent.style.display = "block";
  }
  // loop through reservations and add them to the table
  reservations.forEach((reservation) => {
    const row = reservationTable.insertRow();

    // add columns to the row
    const transactionIdCell = row.insertCell();
    transactionIdCell.innerHTML = `<strong>${reservation.id}</strong>`;

    const bookingNameCell = row.insertCell();
    bookingNameCell.textContent = reservation.name;

    const adventureCell = row.insertCell();
    adventureCell.textContent = reservation.adventureName;

    const personCell = row.insertCell();
    personCell.textContent = reservation.person;

    const dateCell = row.insertCell();
    const date = new Date(reservation.date);
    console.log(date);
    dateCell.textContent = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    const priceCell = row.insertCell();
    priceCell.textContent = `${reservation.price}`;

    const bookingTimeCell = row.insertCell();
    const bookingTime = new Date(reservation.time);
    const value = bookingTime.toLocaleString('en-IN').split(',');
    const dateFormat = bookingTime.toLocaleString('en-IN', {
      day: 'numeric',
      year: 'numeric',
      month: 'long',
    });
    bookingTimeCell.textContent = `${dateFormat},${value[1]}`; 
    

    const actionCell = row.insertCell();
    const buttonEl = document.createElement("button");
    buttonEl.classList.add("reservation-visit-button");
    buttonEl.textContent = 'Visit Adventure';
    const actionLink = document.createElement("a");
    actionLink.href = `../detail/?adventure=${reservation.adventure}`;
    // actionLink.classList.add("reservation-visit-button");
    // actionLink.textContent = "Visit Adventure";
    // actionCell.appendChild(actionLink);
    buttonEl.append(actionLink);
    actionCell.appendChild(buttonEl);
  });
  
}

export { fetchReservations, addReservationToTable };
