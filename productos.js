const obtenerProductos = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    mostrarProductos(data.products);
  } catch (error) {
    console.error("Error:", error);
  }
};

const mostrarProductos = (products) => {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  products.forEach(product => {

    if (product.stock > 0) {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("practice-card");
      tarjeta.innerHTML += `
          <a href="producto.html?id=${product.id}" >
          <h3>${product.title}</h3>
          </a>
          <p>Precio: $${product.price}</p>

          <a href="producto.html?id=${product.id}">
          <img src="${product.thumbnail}" width="150">
          </a>
      `;
      contenedor.appendChild(tarjeta);
    }
  });
};
obtenerProductos();
