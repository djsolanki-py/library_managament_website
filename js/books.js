// Books page grid
const grid = document.getElementById("bookGrid");

// Render all book cards
function renderBooks(list) {
  grid.innerHTML = list.map(createCard).join("");
}

// Show all books at page load
renderBooks(books);
