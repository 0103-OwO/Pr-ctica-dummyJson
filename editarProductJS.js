const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("ID de producto no válido");
}

fetch(`https://dummyjson.com/products/${id}`)
  .then(res => res.json())
  .then(product => {
    document.getElementById("title").value = product.title;
    document.getElementById("price").value = product.price;
  })
  .catch(err => console.error(err));

document.getElementById("form-editar").addEventListener("submit", (e) => {
  e.preventDefault();

  const productoActualizado = {
    title: document.getElementById("title").value,
    price: Number(document.getElementById("price").value),
  };

  fetch(`https://dummyjson.com/products/${id}`, {
    method: "PUT", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productoActualizado)
  })
  .then(res => res.json())
  .then(data => {
    console.log("Producto actualizado:", data);
    alert("Producto actualizado correctamente");
    window.location.href = "administrarProductos.html"; 
  })
  .catch(err => console.error(err));
});
