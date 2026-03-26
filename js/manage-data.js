// Storage key and UI elements
const MANAGE_KEY = "monark-manage";
const manageList = document.getElementById("manageList");
const clearButton = document.getElementById("clearManageData");

// Simple unique id for each record
function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Read list from LocalStorage
function loadManages() {
  const raw = localStorage.getItem(MANAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Save list to LocalStorage
function saveManages(items) {
  localStorage.setItem(MANAGE_KEY, JSON.stringify(items));
}

// Convert any old string data into structured objects
function normalizeManages(items) {
  return items.map((item) => {
    if (typeof item === "string") {
      const parts = item.split(" • ");
      return {
        id: makeId(),
        code: parts[0] || "Unknown",
        action: parts[1] || "Unknown",
        contact: parts[2] || "Unknown"
      };
    }
    if (!item.id) {
      return { ...item, id: makeId() };
    }
    return item;
  });
}

// Render the list into the page
function renderManages(items) {
  if (!manageList) return;
  if (!items.length) {
    manageList.innerHTML = `<div class="data-item">No manage booking data yet.</div>`;
    return;
  }
  manageList.innerHTML = items
    .map(
      (item) => `
        <div class="data-item">
          <strong>Code:</strong> ${item.code}<br>
          <strong>Action:</strong> ${item.action}<br>
          <strong>Contact:</strong> ${item.contact}
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
let manages = normalizeManages(loadManages());
saveManages(manages);
renderManages(manages);

if (clearButton) {
  // Clear all manage data
  clearButton.addEventListener("click", () => {
    localStorage.removeItem(MANAGE_KEY);
    manages = [];
    renderManages(manages);
  });
}

if (manageList) {
  // Handle edit/delete button clicks
  manageList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;
    const index = manages.findIndex((item) => item.id === id);
    if (index === -1) return;

    if (action === "edit") {
      const item = manages[index];
      const current = `${item.code} | ${item.action} | ${item.contact}`;
      const input = prompt("Edit as: Code | Action | Contact", current);
      if (input === null) return;

      const parts = input.split("|").map((p) => p.trim());
      const code = parts[0] || item.code;
      const actionValue = parts[1] || item.action;
      const contact = parts[2] || item.contact;

      manages[index] = { ...item, code, action: actionValue, contact };
      saveManages(manages);
      renderManages(manages);
    }

    if (action === "delete") {
      manages.splice(index, 1);
      saveManages(manages);
      renderManages(manages);
    }
  });
}
