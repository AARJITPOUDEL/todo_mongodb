// app.js

const productForm = document.querySelector("#product-form");
const productList = document.querySelector("#product-list");

// Display all products
function displayProducts() {
  fetch("/products")
    .then((response) => response.json())
    .then((products) => {
      productList.innerHTML = "";

      products.forEach((product) => {
        const li = document.createElement("li");
        const name = document.createElement("span");
        const price = document.createElement("p");
        const description = document.createElement("p");

        name.textContent = product.name;
        price.textContent = `$${product.price.toFixed(2)}`;
        description.textContent = product.description;

        li.appendChild(name);
        li.appendChild(price);
        li.appendChild(description);
        productList.appendChild(li);
      });
    });
}

// Add a new product
function addProduct(event) {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const description = document.querySelector("#description").value;
  const price = parseFloat(document.querySelector("#price").value);

  fetch("/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, price }),
  })
    .then((response) => response.json())
    .then(() => {
      displayProducts();
      productForm.reset();
    });
}

// Load products on page load
displayProducts();

// Add product form submit event listener
productForm.addEventListener("submit", addProduct);
