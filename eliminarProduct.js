function borrarProducto(id, boton) {
  if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

  fetch(`https://dummyjson.com/products/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(data => {
      console.log("Producto eliminado:", data);
      const fila = boton.closest("tr");
      fila.remove();
      alert("Producto eliminado correctamente");
    })
    .catch(err => {
      console.error(err);
      alert("Error al eliminar el producto");
    });
}
