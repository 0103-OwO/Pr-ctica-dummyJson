let skip = 0;
const limit = 10;
let totalProductos = 0;

const cargarProductos = (filtros = {}) => {
  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  if (filtros.busqueda) {
    url = `https://dummyjson.com/products/search?q=${filtros.busqueda}&limit=${limit}&skip=${skip}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderizarTabla(data.products);
      totalProductos = data.total;
      actualizarBotonesPaginacion();
    })
    .catch(err => console.error(err));
};

const renderizarTabla = (products) => {
  const tbody = document.querySelector("#tabla-productos tbody");
  tbody.innerHTML = "";

  products.forEach(product => {
    if (product.stock > 0) {
      const fila = document.createElement("tr");
      fila.id = `producto-${product.id}`;
      fila.innerHTML = `
                <td>${product.id}</td>
                <td><img src="${product.thumbnail}" width="100"></td>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td>${product.category}</td>
                <td>
                    <a href="editarProduct.html?id=${product.id}" class="btn btn-sm btn-dark me-1">Editar</a>
                    <button class="btn btn-sm btn-dark me-1" onclick="borrarProducto(${product.id}, this)">Borrar</button>
                </td>
            `;
      tbody.appendChild(fila);
    }
  });
};

const actualizarBotonesPaginacion = () => {
  const btnAnterior = document.getElementById("btn-anterior");
  const btnSiguiente = document.getElementById("btn-siguiente");
  const infoPagina = document.getElementById("info-pagina");

  const paginaActual = Math.floor(skip / limit) + 1;
  const totalPaginas = Math.ceil(totalProductos / limit);

  infoPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;

  btnAnterior.disabled = skip === 0;
  btnSiguiente.disabled = skip + limit >= totalProductos;

  btnAnterior.onclick = () => {
    if (skip > 0) {
      skip -= limit;
      cargarProductos();
    }
  };
  btnSiguiente.onclick = () => {
    if (skip + limit < totalProductos) {
      skip += limit;
      cargarProductos();
    }
  };
};

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});
