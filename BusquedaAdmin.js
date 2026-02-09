const inputBusqueda = document.getElementById("input-busqueda");

inputBusqueda.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const termino = inputBusqueda.value.trim();

    const url = termino 
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(termino)}&limit=10`
      : `https://dummyjson.com/products?limit=10`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector("#tabla-productos tbody");
        tbody.innerHTML = "";

        const productos = data.products || data;

        if (!productos || productos.length === 0) {
          tbody.innerHTML = `<tr><td colspan="6">No se encontraron productos.</td></tr>`;
          return;
        }
        
        productos.forEach(p => {
          tbody.innerHTML += `
            <tr>
              <td>${p.id}</td>
              <td><img src="${p.thumbnail}" width="100"></td>
              <td>${p.title}</td>
              <td>$${p.price}</td>
              <td>${p.category}</td>
              <td>
                <a href="editarProduct.html?id=${p.id}" class="btn btn-sm btn-dark me-1">Editar</a>
                <button class="btn btn-sm btn-dark me-1" onclick="borrarProducto(${p.id}, this)">Borrar</button>
              </td>
            </tr>
          `;
        });
      })
      .catch(err => console.error("Error en la búsqueda:", err));
  }
});
