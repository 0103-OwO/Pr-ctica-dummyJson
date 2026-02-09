const selectCategoria = document.getElementById("categoria");

selectCategoria.addEventListener("change", () => {
  const categoria = selectCategoria.value;

  if (!categoria) {
    cargarProductos({ busqueda: inputBusqueda.value });
  } else {
    fetch(`https://dummyjson.com/products/category/${categoria}`)
      .then(res => res.json())
      .then(data => {
        renderizarTabla(data.products);
        totalProductos = data.products.length; 
        actualizarBotonesPaginacion();
      })
      .catch(err => console.error(err));
  }
});
