// Search page elements
const searchInput = document.getElementById("searchInput");
const searchGrid = document.getElementById("searchGrid");

// Render search results into the grid
function renderSearchResults(list) {
  searchGrid.innerHTML = list.map(createCard).join("");
}

// Filter books as the user types
searchInput.addEventListener("input", (event) => {
  const term = event.target.value.toLowerCase();
  const filtered = books.filter(
    (book) => book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term)
  );
  renderSearchResults(filtered);
});

// Show all books at page load
renderSearchResults(books);
