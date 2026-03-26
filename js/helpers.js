// Create one book card HTML block
function createCard(book) {
  return `
    <article class="card">
      <img src="${book.image}" alt="${book.title}" loading="lazy" decoding="async" />
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Category: ${book.category}</p>
      <button class="btn primary" onclick="alert('Issue request recorded for ${book.title}')">Issue</button>
    </article>
  `;
}
