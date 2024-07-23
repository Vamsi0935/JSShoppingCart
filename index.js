document.addEventListener("DOMContentLoaded", () => {
  const apiUrl =
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
  const searchInput = document.getElementById("searchBar");
  const buttonsContainer = document.getElementById("category_name");
  const navbar = document.getElementById("categoryButtons");
  const productsContainer = document.getElementById("productsBlock");

  let allProducts = [];

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      allProducts = data.categories;
      createCategoryButtons(data.categories);
      displayProducts(data.categories);
      createNavbar();
    })
    .catch((error) => console.error("Error fetching data:", error));
  function createNavbar() {
    const navbar = document.createElement("nav");
    navbar.classList.add("navbar");
    const navbarBrand = document.createElement("div");
    navbarBrand.classList.add("navbar-brand");
    navbar.appendChild(navbarBrand);
    const navbarButtons = document.createElement("div");
    navbarButtons.classList.add("navbar-buttons");
    navbar.appendChild(navbarButtons);
    document.body.appendChild(navbar);
  }

  function createCategoryButtons(data) {
    const allButton = document.createElement("button");
    allButton.textContent = "All";
    allButton.addEventListener("click", () => displayProducts(allProducts));
    buttonsContainer.appendChild(allButton);

    data.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category.category_name;
      button.addEventListener("click", () =>
        filterProducts(category.category_name)
      );
      buttonsContainer.appendChild(button);
    });
  }

  function displayProducts(data) {
    productsContainer.innerHTML = "";
    data.forEach((category) => {
      category.category_products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product shadow";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" width="100%">
            <h3 style="text-align: center">${product.title}</h3>
            <p style="text-align: center">Vendor: ${product.vendor}</p>
            <p style="text-align: center">Price: ${product.price}</p>
            <p style="text-align: center">Compared at price: ${product.compare_at_price}</p>
            <p style="text-align: center">Badge: ${product.badge_text}</p>
          `;
        productsContainer.appendChild(productDiv);
      });
    });
  }

  function filterProducts(categoryName) {
    const filteredData = allProducts.filter(
      (category) => category.category_name === categoryName
    );
    displayProducts(filteredData);
  }

  searchInput.addEventListener("input", (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = allProducts
      .map((category) => ({
        category_name: category.category_name,
        category_products: category.category_products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery)
        ),
      }))
      .filter((category) => category.category_products.length > 0);

    displayProducts(filteredData);
  });
});
