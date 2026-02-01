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
    const contenedor = document.getElementById("contenedor-detalles");

    const reseñas = product.reviews.map(rev => `
        <div class="review">
            ${rev.reviewerName} califico con ${rev.rating}⭐: 
            <em>"${rev.comment}"</em>
        </div>
    `).join('');

    contenedor.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}" height="40%" width="40%" class="img-detalle">
            <div id="detallesproducto">
                <h1>${product.title}</h1>
                <p class="marca">Marca: ${product.brand}</p>
                <p class="precio">Precio: $${product.price} <span class="descuento">- ${product.discountPercentage}%</span></p>
                <p class="descripcion"> Descripción <p>${product.description}</p>
                
                <h3>Especificaciones:</h3>
                <ul>
                    <li>Categoría: ${product.category}</li>
                    <li>Stock: ${product.stock} unidades (${product.availabilityStatus})</li>
                    <li>Garantía: ${product.warrantyInformation}</li>
                    <li>Envío: ${product.shippingInformation}</li>
                    <li>Dimensiones: ${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm</li>
                    <li>Peso: ${product.weight}g</li>
                </ul>

                <h3>Políticas:</h3>
                <p>Retorno: ${product.returnPolicy}</p>
                <p>Mínimo de compra: ${product.minimumOrderQuantity} unidades</p>

                <h3>Reseñas de clientes:</h3>
                <div class="reviews-contenedor">
                    ${reseñas}
                </div>
                
                <br>
                <button onclick="history.back()" class="btn-volver">Regresar al producto</button>
            </div>
    `;
};
detalleProducto();