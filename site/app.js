const productCards = [...document.querySelectorAll(".product-card")];
const categoryButtons = [...document.querySelectorAll(".category-card")];
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const resultsMessage = document.querySelector("#results-message");
const emptyState = document.querySelector("#empty-state");
const cartCount = document.querySelector("#cart-count");
const toast = document.querySelector("#toast");

let selectedCategory = "all";
let searchTerm = "";
let cartItems = 0;
let toastTimer;

function updateProducts() {
  let visibleCount = 0;

  for (const card of productCards) {
    const matchesCategory =
      selectedCategory === "all" || card.dataset.category === selectedCategory;
    const matchesSearch =
      `${card.dataset.name} ${card.dataset.category}`.includes(searchTerm);
    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  emptyState.hidden = visibleCount > 0;
  resultsMessage.textContent =
    searchTerm || selectedCategory !== "all"
      ? `${visibleCount} ${visibleCount === 1 ? "producto encontrado" : "productos encontrados"}`
      : "";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchTerm = searchInput.value.trim().toLocaleLowerCase("es");
  updateProducts();
  document.querySelector("#productos").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) {
    searchTerm = "";
    updateProducts();
  }
});

for (const button of categoryButtons) {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    for (const categoryButton of categoryButtons) {
      categoryButton.classList.toggle("active", categoryButton === button);
      categoryButton.setAttribute("aria-pressed", String(categoryButton === button));
    }
    updateProducts();
  });
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
}

for (const button of document.querySelectorAll(".add-button")) {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = String(cartItems);
    showToast("¡Listo! Agregamos el producto a tu carrito.");
  });
}

for (const button of document.querySelectorAll(".favorite")) {
  button.addEventListener("click", () => {
    const isFavorite = button.classList.toggle("is-favorite");
    button.textContent = isFavorite ? "♥" : "♡";
    button.setAttribute(
      "aria-label",
      `${isFavorite ? "Quitar" : "Agregar"} ${button.closest(".product-card").dataset.name} ${isFavorite ? "de" : "a"} favoritos`,
    );
    showToast(isFavorite ? "Guardado en tus favoritos." : "Quitado de tus favoritos.");
  });
}

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#newsletter-message").textContent =
    "¡Gracias! Ya estás en nuestra lista.";
  event.currentTarget.reset();
});
