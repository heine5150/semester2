import { baseUrl } from "./setting/api.js";
import { renderProducts } from "./ui/renderProducts.js";
import { displayMessage } from "./ui/displayMessage.js";
// import { searchProducts } from "./ui/searchProducts.js";

const resultContainer = document.querySelector(".results");
const searchBar = document.querySelector(".search");

const productUrl = baseUrl + "?populate=image";

async function getProducts() {
  try {
    const response = await fetch(productUrl);
    const results = await response.json();

    const products = results.data;

    renderProducts(products);
    // searchProducts(products);

    searchBar.onkeyup = function (event) {
      const searchValue = event.target.value.trim().toLowerCase();

      const filteredProducts = products.filter(function (product) {
        if (
          product.attributes.title.toLowerCase().includes(searchValue) ||
          product.attributes.description.toLowerCase().includes(searchValue)
        ) {
          return true;
        }
      });
      renderProducts(filteredProducts);
    };
  } catch (error) {
    resultContainer.innerHTML = displayMessage(
      "danger",
      "Ouf, something went wrong!"
    );
  }
}
getProducts();
