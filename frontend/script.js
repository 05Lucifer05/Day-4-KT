const API = "http://localhost:5000/api/books";
async function addBook() {
  const book = {
    title: title.value,
    author: author.value,
    category: category.value,
    publishedYear: Number(year.value),
    availableCopies: Number(copies.value)
  };

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });

  const data = await res.json();
  alert(data.error || "Book added successfully");

  loadBooks();
}

async function loadBooks() {
  const res = await fetch(API);
  const books = await res.json();

  bookList.innerHTML = books.map(b => `
    <div class="card">
      <b>${b.title}</b> — ${b.author}
      <br>Category: ${b.category}
      <br>Year: ${b.publishedYear}
      <br>Copies: ${b.availableCopies}

      <br><br>

      <button onclick="updateCopies('${b._id}',1)">+ Copy</button>
      <button onclick="updateCopies('${b._id}',-1)">- Copy</button>

      <button onclick="changeCategory('${b._id}')">Change Category</button>

      <button onclick="deleteBook('${b._id}')">Delete</button>
    </div>
  `).join("");
}

async function updateCopies(id, change) {
  const res = await fetch(`${API}/${id}/copies`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ change })
  });

  const data = await res.json();
  alert(data.error || "Stock updated");
  loadBooks();
}

async function changeCategory(id) {
  const category = prompt("Enter new category:");
  if (!category) return;

  await fetch(`${API}/${id}/category`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category })
  });

  loadBooks();
}

async function deleteBook(id) {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  const data = await res.json();

  alert(data.error || "Book deleted");
  loadBooks();
}

loadBooks();
