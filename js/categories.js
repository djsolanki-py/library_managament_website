// Category page elements
const categoryBar = document.getElementById("categoryBar");
const categoryGrid = document.getElementById("categoryGrid");

// Build the category buttons
function renderCategoryButtons() {
  categoryBar.innerHTML = categories
    .map(
      (cat, index) =>
        `<button class="${index === 0 ? "active" : ""}" data-category="${cat}">${cat}</button>`
    )
    .join("");
}

// Show books for the selected category
function renderCategoryBooks(category) {
  const filtered = category === "All" ? books : books.filter((b) => b.category === category);
  categoryGrid.innerHTML = filtered.map(createCard).join("");
}

// Read ?category=... from URL (if any)
function getCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

// Handle button clicks
categoryBar.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const selected = event.target.getAttribute("data-category");
  document.querySelectorAll(".category-bar button").forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderCategoryBooks(selected);
});

// Initial render
renderCategoryButtons();
const initialCategory = getCategoryFromUrl();
if (initialCategory && categories.includes(initialCategory)) {
  const target = [...document.querySelectorAll(".category-bar button")].find(
    (btn) => btn.getAttribute("data-category") === initialCategory
  );
  if (target) target.classList.add("active");
  renderCategoryBooks(initialCategory);
} else {
  renderCategoryBooks("All");
}
