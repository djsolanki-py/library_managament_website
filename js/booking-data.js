// Storage key and UI elements
const BOOKING_KEY = "monark-bookings";
const bookingList = document.getElementById("bookingList");
const clearButton = document.getElementById("clearBookingData");

// Simple unique id for each record
function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Read list from LocalStorage
function loadBookings() {
  const raw = localStorage.getItem(BOOKING_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Save list to LocalStorage
function saveBookings(items) {
  localStorage.setItem(BOOKING_KEY, JSON.stringify(items));
}

// Convert any old string data into structured objects
function normalizeBookings(items) {
  return items.map((item) => {
    if (typeof item === "string") {
      const parts = item.split(" • ");
      return {
        id: makeId(),
        name: parts[0] || "Unknown",
        room: parts[1] || "Unknown",
        slot: parts[2] || "Unknown"
      };
    }
    if (!item.id) {
      return { ...item, id: makeId() };
    }
    return item;
  });
}

// Render the list into the page
function renderBookings(items) {
  if (!bookingList) return;
  if (!items.length) {
    bookingList.innerHTML = `<div class="data-item">No booking data yet.</div>`;
    return;
  }
  bookingList.innerHTML = items
    .map(
      (item) => `
        <div class="data-item">
          <strong>Student:</strong> ${item.name}<br>
          <strong>Room:</strong> ${item.room}<br>
          <strong>Slot:</strong> ${item.slot}
          <div class="data-actions-row">
            <button class="btn ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
            <button class="btn ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
          </div>
        </div>
      `
    )
    .join("");
}

// Load, normalize, save, and show once on page load
let bookings = normalizeBookings(loadBookings());
saveBookings(bookings);
renderBookings(bookings);

if (clearButton) {
  // Clear all booking data
  clearButton.addEventListener("click", () => {
    localStorage.removeItem(BOOKING_KEY);
    bookings = [];
    renderBookings(bookings);
  });
}

if (bookingList) {
  // Handle edit/delete button clicks
  bookingList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;
    const index = bookings.findIndex((item) => item.id === id);
    if (index === -1) return;

    if (action === "edit") {
      const item = bookings[index];
      const current = `${item.name} | ${item.room} | ${item.slot}`;
      const input = prompt("Edit as: Student | Room | Slot", current);
      if (input === null) return;

      const parts = input.split("|").map((p) => p.trim());
      const name = parts[0] || item.name;
      const room = parts[1] || item.room;
      const slot = parts[2] || item.slot;

      bookings[index] = { ...item, name, room, slot };
      saveBookings(bookings);
      renderBookings(bookings);
    }

    if (action === "delete") {
      bookings.splice(index, 1);
      saveBookings(bookings);
      renderBookings(bookings);
    }
  });
}
