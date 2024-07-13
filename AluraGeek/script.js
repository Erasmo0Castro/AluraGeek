document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const productForm = document.getElementById("product-form");
  const clearFormButton = document.getElementById("clear-form");

  // Cargar productos desde el almacenamiento local
  loadProducts();

  // Evento de envío del formulario
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct();
  });

  // Evento de limpiar formulario
  clearFormButton.addEventListener("click", clearForm);

  // Función para agregar producto
  function addProduct() {
    const name = document.getElementById("product-name").value.trim();
    const price = document.getElementById("product-price").value.trim();
    const image = document.getElementById("product-image").value.trim();

    if (name && price && image) {
      const product = {
        id: Date.now(),
        name,
        price,
        image,
      };

      // Guardar producto en el almacenamiento local
      saveProduct(product);

      // Mostrar producto en la lista
      displayProduct(product);

      // Limpiar formulario
      clearForm();
    } else {
      alert("Por favor, complete todos los campos.");
    }
  }

  // Función para mostrar un producto en la lista
  function displayProduct(product) {
    const productItem = document.createElement("div");
    productItem.className = "product-item";
    productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$ ${product.price}</p>
            <button class="delete-btn" data-id="${product.id}">&times;</button>
        `;
    productList.appendChild(productItem);

    // Evento de eliminar producto
    productItem
      .querySelector(".delete-btn")
      .addEventListener("click", deleteProduct);
  }

  // Función para eliminar producto
  function deleteProduct(e) {
    const productId = e.target.dataset.id;
    e.target.parentElement.remove();

    // Eliminar producto del almacenamiento local
    removeProduct(productId);
  }

  // Función para limpiar formulario
  function clearForm() {
    productForm.reset();
  }

  // Función para cargar productos desde el almacenamiento local
  function loadProducts() {
    const products = getProducts();
    products.forEach(displayProduct);
  }

  // Función para obtener productos del almacenamiento local
  function getProducts() {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : [];
  }

  // Función para guardar producto en el almacenamiento local
  function saveProduct(product) {
    const products = getProducts();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
  }

  // Función para eliminar producto del almacenamiento local
  function removeProduct(productId) {
    let products = getProducts();
    products = products.filter((product) => product.id != productId);
    localStorage.setItem("products", JSON.stringify(products));
  }
});
