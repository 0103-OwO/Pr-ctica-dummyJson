const detalleProducto = async () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        try {

            const res = await fetch(`https://dummyjson.com/products/${id}`);
            const product = await res.json();

            mostrarDetalle(product);
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    }
};
const mostrarDetalle = (product) => {
    const contenedor = document.getElementById("contenedor-producto");

    contenedor.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" >
        <div>
        <h1>${product.title}</h1>
        <p class="precio">Precio: $${product.price}</p>
        <p class="categoria">Categoría: ${product.category}</p>
        <p class="rating">Calificación: ${product.rating} ⭐</p>
        
        <button class="btn-volver" onclick="window.location.href='detalles.html?id=${product.id}'"> Ver todos los detalles </button>
        </div>
  `;
};
detalleProducto();