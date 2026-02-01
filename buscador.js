let listaProductos = [];

const obtenerProductos = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    listaProductos = data.products; 
    mostrarProductos(listaProductos);
  } catch (error) {
    console.error("Error:", error);
  }
};

const inputBusqueda = document.getElementById("input-busqueda");

inputBusqueda.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase(); 
    
    const productosFiltrados = listaProductos.filter(product => 
        product.title.toLowerCase().includes(texto)
    );

    mostrarProductos(productosFiltrados);
});

const mostrarProductos = (products) => {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  if (products.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron productos.</p>";
      return;
  }

  products.forEach(product => {
    if (product.stock > 0) {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("practice-card");
      tarjeta.innerHTML = `
          <h3>${product.title}</h3>
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