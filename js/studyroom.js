// Forms on the study room page
const bookingForm = document.getElementById("bookingForm");
const manageForm = document.getElementById("manageForm");

// LocalStorage keys
const BOOKING_KEY = "monark-bookings";
const MANAGE_KEY = "monark-manage";

// Read list from LocalStorage (or return empty list)
function loadList(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

// Save list to LocalStorage
function saveList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

// Simple unique id for each record
function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

if (bookingForm) {
  // Save "Book A Room" form data
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("bookingName").value.trim();
    const room = document.getElementById("bookingRoom").value;
    const slot = document.getElementById("bookingSlot").value;

    const bookings = loadList(BOOKING_KEY);
    bookings.unshift({ id: makeId(), name, room, slot });
    saveList(BOOKING_KEY, bookings);

    bookingForm.reset();
  });
}

if (manageForm) {
  // Save "Manage Booking" form data
  manageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const code = document.getElementById("manageCode").value.trim();
    const action = document.getElementById("manageAction").value;
    const contact = document.getElementById("manageContact").value.trim();

    const manages = loadList(MANAGE_KEY);
    manages.unshift({ id: makeId(), code, action, contact });
    saveList(MANAGE_KEY, manages);

    manageForm.reset();
  });
}
