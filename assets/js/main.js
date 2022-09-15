// http://localhost:3000/items

const searchInput = document.querySelector("#search");
const productsDiv = document.querySelector(".center-products");
const btns = document.querySelectorAll(".btn");

let allProductData = [];
let filters = {
  searchItem: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((response) => {
      allProductData = response.data;
      renderProduct(response.data, filters);
    })
    .catch((error) => console.log(error));
});

searchInput.addEventListener("input", (e) => {
  filters.searchItem = e.target.value;
  renderProduct(allProductData, filters);
});

function renderProduct(_products, _filters) {
  const filteredData = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItem.toLowerCase());
  });
  //   add to DOM
  productsDiv.innerHTML = "";
  filteredData.forEach((element, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
   <div class="image-container">
     <img src=${element.image} class="product-image" alt="p-${++index}" />
   </div>
   <div class="product__desc">
     <p class="product__title">${element.title}</p>
     <p class="product__price">${element.price} $</p>
   </div>
 `;
    productsDiv.appendChild(productDiv);
  });
}
// filter based on groups :
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    // e.target.classList.add("active");
    // console.log(e.target.innerText);
    filters.searchItem = filter;
    renderProduct(allProductData, filters);
  });
});
